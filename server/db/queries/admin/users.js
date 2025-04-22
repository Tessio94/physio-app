const pool = require("../../database");

const getUsers = () => {
	return pool.query("SELECT * FROM users;");
};

const getAdminSchedule = (therapistId) => {
	const sql = `
SELECT ajde.*, tss.service_id, s.name AS service_name, s.icon AS service_icon, b.user_id as user_id, u.name AS user_name, u.lastname AS user_lastname, u.phone AS user_phone, u.email AS user_email, b.napomena as napomena, b.created_at as created_at FROM
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
			WHERE ts.id = 1 ORDER BY time_range ASC
          ) sub2
        ) sub
        WHERE upper(available) - lower(available) >= interval '30 minutes'
          AND EXTRACT(DOW FROM lower(available)) NOT IN (0, 6)
          AND therapist_id = $1) tr
        INNER JOIN therapists t ON tr.therapist_id = t.id) ajde
		LEFT JOIN therapists_services tss ON ajde.therapist_id = tss.therapist_id
		LEFT JOIN services s ON tss.service_id = s.id
		LEFT JOIN bookings b on ajde.therapist_id = b.therapist_id
    LEFT JOIN users u ON b.user_id = u.id;
    `;

	return pool.query(sql, [therapistId]);
};

const getBookings = () => {
	return pool.query("SELECT * FROM bookings;");
};

module.exports = {
	getUsers,
	getAdminSchedule,
	getBookings,
};
