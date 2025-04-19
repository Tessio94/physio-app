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


  --------------------------------------------------promijeni booking tablicu-------------
  CREATE TABLE IF NOT EXISTS public.bookings
(
    id integer NOT NULL DEFAULT nextval('bookings_id_seq'::regclass),
    user_id integer NOT NULL,
    service_id integer NOT NULL,
    therapist_id integer NOT NULL,
    time_range tsrange NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (id),
    CONSTRAINT bookings_service_id_fkey FOREIGN KEY (service_id)
        REFERENCES public.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT bookings_therapist_id_fkey FOREIGN KEY (therapist_id)
        REFERENCES public.therapists (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT bookings_therapist_id_time_range_excl EXCLUDE USING gist (
        therapist_id WITH =,
        time_range WITH &&)

)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bookings
    OWNER to postgres;

------------------------------------------kod koji radi (promijenjen jer ne ništi iste termine za therapiste-------------------------------
-- services
  SELECT tr.*, t.name as therapist_name, t.lastname as therapist_lastname, t.icon as therapist_icon, s.name as service_name, s.icon as service_icon
    FROM
    (SELECT therapist_id, service_id, available
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
            SELECT ts.therapist_id,  ts.service_id,
              tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
            FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
            JOIN therapists_services ts ON TRUE
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
          AND service_id = $1) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id
        INNER JOIN services s ON tr.service_id = s.id;


-- therapist
 SELECT tr.*, t.name as therapist_name, t.lastname as therapist_lastname, t.icon as therapist_icon, s.name as service_name, s.icon as service_icon
    FROM
    (SELECT therapist_id, service_id, available
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
            SELECT ts.therapist_id,  ts.service_id,
              tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
            FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
            JOIN therapists_services ts ON TRUE
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
          AND service_id = $1
          AND therapist_id = $2) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id
        INNER JOIN services s ON tr.service_id = s.id;
       ---kad se odabere therapist samo nadodajemo na kraj  AND therapist_id = $2;`;

/*primjer onog što nam vrati query:
Result {
  command: 'SELECT',
  rowCount: 34,
  oid: null,
  rows: [
    {
      therapist_id: 2,
      service_id: 2,
      available: '["2025-04-18 08:00:00","2025-04-18 20:00:00")',
      therapist_name: 'Marija',
      therapist_lastname: 'Horvat',
      therapist_icon: '/assets/grid/Marija.jpg',
      service_name: 'Ultrazvučna terapija',
      service_icon: '/assets/services/ultrasound.svg'
    },
    {
      therapist_id: 2,
      service_id: 2,
      available: '["2025-04-21 08:00:00","2025-04-21 20:00:00")',
      therapist_name: 'Marija',
      therapist_lastname: 'Horvat',
      therapist_icon: '/assets/grid/Marija.jpg',
      service_name: 'Ultrazvučna terapija',
      service_icon: '/assets/services/ultrasound.svg'
    },
    ...
     {
      therapist_id: 5,
      service_id: 2,
      available: '["2025-04-21 08:00:00","2025-04-21 20:00:00")',
      therapist_name: 'Ema',
      therapist_lastname: 'Carić',
      therapist_icon: '/assets/grid/Ema.jpg',
      service_name: 'Ultrazvučna terapija',
      service_icon: '/assets/services/ultrasound.svg'
    },
    ...
    ]
    */

/*-------------------ovaj dobro ništi da jedan therapist ne moze radit u dva ista vremena-------------*/

WITH all_therapist_slots AS (
    SELECT therapist_id, time_range
    FROM bookings
    WHERE therapist_id = 1
    AND lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
    
    UNION
    
    -- Working hours (8:00-20:00 each day)
    SELECT 1 as therapist_id,
           tsrange(dates.dt + interval '8 hours', dates.dt + interval '20 hours') AS time_range
    FROM generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(dt)
),
ordered_slots AS (
    SELECT therapist_id, time_range,
           lower(time_range) as slot_start,
           upper(time_range) as slot_end,
           lead(lower(time_range)) OVER (PARTITION BY therapist_id ORDER BY lower(time_range)) as next_slot_start
    FROM all_therapist_slots
    ORDER BY therapist_id, lower(time_range)
),
available_slots AS (
    SELECT therapist_id,
           tsrange(slot_end, next_slot_start) as available
    FROM ordered_slots
    WHERE next_slot_start IS NOT NULL
    AND slot_end < next_slot_start
    AND upper(tsrange(slot_end, next_slot_start)) - lower(tsrange(slot_end, next_slot_start)) >= interval '30 minutes'
    AND EXTRACT(DOW FROM lower(tsrange(slot_end, next_slot_start))) NOT IN (0, 6)
)
SELECT ts.therapist_id, ts.service_id, 
       t.name as therapist_name, t.icon therapist_icon, 
       s.name as service_name, s.icon as service_icon,
       a.available
FROM therapists_services ts
JOIN therapists t ON ts.therapist_id = t.id
JOIN services s ON ts.service_id = s.id
JOIN available_slots a ON a.therapist_id = ts.therapist_id
WHERE ts.therapist_id = 1
ORDER BY ts.service_id, a.available;

/*----------------------------we made it brotha------------------------------------*/
-- services
SELECT * FROM 
(
SELECT ajde.*, tss.service_id, s.name, s.icon FROM
 (SELECT tr.*, t.name as therapist_name, t.lastname as therapist_lastname, t.icon as therapist_icon
    FROM
    (SELECT therapist_id, available
        FROM (
          SELECT therapist_id,
            tsrange(upper(time_range), lower(lead(time_range) OVER
              (PARTITION BY therapist_id ORDER BY lower(time_range)))) AS available
          FROM (
            -- ✅ Booked slots - only valid therapist/service pairs
            SELECT b.therapist_id, b.time_range
            FROM bookings b
            JOIN therapists ts ON ts.id = b.therapist_id
            WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
    
            UNION
    
            -- ✅ Working hours for all valid therapist/service pairs
            SELECT ts.id AS therapist_id,  
              tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
            FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
            INNER JOIN therapists ts ON TRUE
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id) ajde
		LEFT JOIN therapists_services tss ON ajde.therapist_id = tss.therapist_id
		LEFT JOIN services s ON tss.service_id = s.id
		) WHERE service_id = 1;

-- therapist
/*
SELECT ajde.*, tss.service_id, s.name, s.icon FROM
 (SELECT tr.*, t.name as therapist_name, t.lastname as therapist_lastname, t.icon as therapist_icon
    FROM
    (SELECT therapist_id, available
        FROM (
          SELECT therapist_id,
            tsrange(upper(time_range), lower(lead(time_range) OVER
              (PARTITION BY therapist_id ORDER BY lower(time_range)))) AS available
          FROM (
            -- ✅ Booked slots - only valid therapist/service pairs
            SELECT b.therapist_id, b.time_range
            FROM bookings b
            JOIN therapists ts ON ts.id = b.therapist_id
            WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
    
            UNION
    
            -- ✅ Working hours for all valid therapist/service pairs
            SELECT ts.id AS therapist_id,  
              tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
            FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
            INNER JOIN therapists ts ON TRUE
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
          AND therapist_id = 1) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id) ajde
		LEFT JOIN therapists_services tss ON ajde.therapist_id = tss.therapist_id
		LEFT JOIN services s ON tss.service_id = s.id
		;
*/
    SELECT * FROM 
(
SELECT ajde.*, tss.service_id, s.name, s.icon FROM
 (SELECT tr.*, t.name as therapist_name, t.lastname as therapist_lastname, t.icon as therapist_icon
    FROM
    (SELECT therapist_id, available
        FROM (
          SELECT therapist_id,
            tsrange(upper(time_range), lower(lead(time_range) OVER
              (PARTITION BY therapist_id ORDER BY lower(time_range)))) AS available
          FROM (
            -- ✅ Booked slots - only valid therapist/service pairs
            SELECT b.therapist_id, b.time_range
            FROM bookings b
            JOIN therapists ts ON ts.id = b.therapist_id
            WHERE lower(time_range)::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
    
            UNION
    
            -- ✅ Working hours for all valid therapist/service pairs
            SELECT ts.id AS therapist_id,  
              tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
            FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
            INNER JOIN therapists ts ON TRUE
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
          AND therapist_id = 1) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id) ajde
		LEFT JOIN therapists_services tss ON ajde.therapist_id = tss.therapist_id
		LEFT JOIN services s ON tss.service_id = s.id
		) WHERE service_id = 1;

    /*dodati dva polja na bookings table*/
    --    napomena text COLLATE pg_catalog."default",
    -- created_at timestamp without time zone DEFAULT now(),