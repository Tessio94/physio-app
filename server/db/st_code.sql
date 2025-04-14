

CREATE EXTENSION btree_gist;

CREATE TABLE usg_bookings (
   id serial PRIMARY KEY,
   user_id integer NOT NULL,
   boat_id integer NOT NULL,
   time_range tsrange NOT NULL,
   EXCLUDE USING gist (boat_id WITH =, time_range WITH &&)
);
Find available periods for all boats:

SELECT boat_id, available
FROM (
    SELECT boat_id,
           tsrange(upper(time_range), lower(lead(time_range) OVER 
               (PARTITION BY boat_id ORDER BY lower(time_range)))) AS available
    FROM (
        SELECT boat_id, time_range
        FROM usg_bookings
        WHERE lower(time_range)::date BETWEEN <<<start_date>>> AND <<<final_date>>>
        UNION
        SELECT boat_id,
               tsrange(closed + interval '16 hours', closed + interval '32 hours')
        FROM generate_series(<<<start_date>>> - 1, <<<final_date>>>) dates(closed),
             VALUES(<<<boat ids>>>) b(boat_id) ) sub2
    ) sub
WHERE upper(available) - lower(available) >= interval '3 hours';