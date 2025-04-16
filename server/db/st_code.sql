CREATE EXTENSION btree_gist;

CREATE TABLE bookings (
   id serial PRIMARY KEY,
   user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   service_id integer NOT NULL REFERENCES services(id) ON DELETE CASCADE,
   therapist_id integer NOT NULL REFERENCES services(id) ON DELETE CASCADE,
   time_range tsrange NOT NULL,
   EXCLUDE USING gist (therapist_id WITH =, time_range WITH &&)
);

/*
select * from bookings;
select * from users;



INSERT INTO users (name, lastname, email, phone, password)
VALUES
    ('Šime', 'Klapan', 'messi94@gmail.com', '099-455-2987', 'mescatore123');
	
INSERT INTO bookings (user_id, service_id, therapist_id, time_range)
VALUES
    (1, 1, 2, '["2025-04-15 08:00:00","2025-04-15 08:30:00")'),
    (1, 1, 2, '["2025-04-15 10:30:00","2025-04-15 11:00:00")');
*/

-------------------------when we select services-----------------------------
SELECT service_id, available
FROM (
  SELECT service_id,
	tsrange(upper(time_range), lower(lead(time_range) OVER
	  (PARTITION BY service_id ORDER BY lower(time_range)))) AS available
  FROM (
	SELECT service_id, time_range
	FROM bookings
	WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
	UNION
	SELECT service_id,
		  tsrange(closed + interval '20 hours', closed + interval '32 hours')
	FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed),
		(VALUES (1), (2), (3), (4), (5), (6)) b(service_id)
  ) sub2
) sub
WHERE upper(available) - lower(available) >= interval '30 min' and service_id=1
and EXTRACT(DOW FROM lower(available)) NOT IN (0,6);


-------------------------when we select therapist-----------------------------
  SELECT service_id, therapist_id, available
FROM (
  SELECT service_id, therapist_id,
    tsrange(
      upper(time_range),
      lower(lead(time_range) OVER (PARTITION BY service_id, therapist_id ORDER BY lower(time_range)))
    ) AS available,
    lower(time_range) as lowerTime,
    upper(time_range) as upperTime,
    lower(lead(time_range) OVER (PARTITION BY service_id, therapist_id ORDER BY lower(time_range))) as lowerLeadTime
  FROM (
    SELECT service_id, therapist_id, time_range
    FROM bookings
    WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'

    UNION

    SELECT ts.service_id, ts.therapist_id,
           tsrange(closed + interval '20 hours', closed + interval '32 hours')
    FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
    JOIN therapists_services ts ON TRUE
  ) sub2
) sub
WHERE upper(available) - lower(available) >= interval '30 min'
  AND therapist_id = 2;


-------------------------30 min intervals-----------------------------
  SELECT therapist_id, time_range
		FROM bookings
		WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days' 
		UNION
SELECT therapist_id, ts
FROM generate_series(
    (CURRENT_DATE - 1)::timestamp,
    CURRENT_DATE + INTERVAL '14 days',
    INTERVAL '30 min'
) AS ts,
(VALUES (1), (2), (3), (4), (5), (6)) b(therapist_id)
WHERE EXTRACT(HOUR FROM ts) >= 8 AND EXTRACT(HOUR FROM ts) < 20
ORDER BY therapist_id, ts asc;

-----------------------------------newest code--------------------------
SELECT therapist_id, service_id, available
FROM (
  SELECT therapist_id, service_id,
    tsrange(upper(time_range), lower(lead(time_range) OVER
      (PARTITION BY therapist_id, service_id ORDER BY lower(time_range)))) AS available
  FROM (
    -- ✅ Booked slots - only valid therapist/service pairs
    SELECT b.therapist_id, b.service_id, b.time_range
    FROM bookings b
    JOIN therapists_services ts ON ts.therapist_id = b.therapist_id AND ts.service_id = b.service_id
    WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'

    UNION

    -- ✅ Working hours for all valid therapist/service pairs
    SELECT ts.therapist_id, ts.service_id,
      tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
    FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
    JOIN therapists_services ts ON TRUE
  ) sub2
) sub
WHERE upper(available) - lower(available) >= interval '30 minutes'
  AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
  AND service_id = 2;