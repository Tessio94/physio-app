const pool = require("../database");

const getServices = () => {
	return pool.query("SELECT id, name, icon FROM services;");
};

const getAvailableSlotsQuery = (id, serviceId) => {
	if (id === "all") {
		const sql = `
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
         SELECT ts.therapist_id,  ts.service_id,
           tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
         FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
         JOIN therapists_services ts ON TRUE
       ) sub2
     ) sub
     WHERE upper(available) - lower(available) >= interval '30 minutes'
       AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
       AND service_id = $1;`;

		return pool.query(sql, [serviceId]);
	} else {
		const sql = `
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
         SELECT ts.therapist_id,  ts.service_id,
           tsrange(dates.closed + interval '20 hours', dates.closed + interval '32 hours') AS time_range
         FROM generate_series((CURRENT_DATE - 1)::timestamp, CURRENT_DATE + INTERVAL '14 days', INTERVAL '1 day') dates(closed)
         JOIN therapists_services ts ON TRUE
       ) sub2
     ) sub
     WHERE upper(available) - lower(available) >= interval '30 minutes'
       AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
       AND service_id = $1
       AND therapist_id = $2;`;

		return pool.query(sql, [serviceId, id]);
	}
};

module.exports = {
	getServices,
	getAvailableSlotsQuery,
};
