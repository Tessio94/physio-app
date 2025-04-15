CREATE EXTENSION btree_gist;

CREATE TABLE bookings (
   id serial PRIMARY KEY,
   user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   service_id integer NOT NULL REFERENCES services(id) ON DELETE CASCADE,
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

-- available hours
SELECT service_id, available
FROM (
	SELECT service_id,
	   tsrange(upper(time_range), lower(lead(time_range) OVER 
		   (PARTITION BY service_id ORDER BY lower(time_range)))) AS available,
	   lower(time_range) as lowerTime,
	   upper(time_range) as upperTime,
	   lower(lead(time_range) OVER 
		   (PARTITION BY service_id ORDER BY lower(time_range))) as lowerLeadTime
	FROM (
		SELECT service_id, time_range
		FROM bookings
		WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days' 
		UNION
		SELECT service_id,
				   tsrange(closed + interval '20 hours', closed + interval '32 hours')
		FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed),
				 (VALUES (1), (2), (3), (4), (5), (6)) b(service_id)) sub2
		) sub
WHERE upper(available) - lower(available) >= interval '30 min';