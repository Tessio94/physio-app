const pool = require("../database");

const getServices = () => {
  return pool.query("SELECT id, name, icon FROM services;");
};

const getAvailableSlotsQuery = (therapistId, serviceId) => {
  if (therapistId === "all") {
    const sql = `
    SELECT * FROM 
    (
    SELECT ajde.*, tss.service_id, s.name AS service_name, s.icon AS service_icon FROM
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
        ) WHERE service_id = $1;
    `;

    return pool.query(sql, [serviceId]);
  } else {
    const sql = `
    SELECT * FROM 
    (
    SELECT ajde.*, tss.service_id, s.name AS service_name, s.icon AS service_icon FROM
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
              AND therapist_id = $2) tr
            INNER JOIN therapists t ON tr.therapist_id = t.id) ajde
        LEFT JOIN therapists_services tss ON ajde.therapist_id = tss.therapist_id
        LEFT JOIN services s ON tss.service_id = s.id
        ) WHERE service_id = $1;
    `;

    return pool.query(sql, [serviceId, therapistId]);
  }
};

const makeReservation = async (
  user_id,
  service_id,
  therapist_id,
  time_range,
  napomena
) => {
  const sql = `INSERT INTO bookings (user_id, service_id, therapist_id, time_range, napomena)
		   VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  return pool.query(sql, [
    user_id,
    service_id,
    therapist_id,
    time_range,
    napomena,
  ]);
};

module.exports = {
  getServices,
  getAvailableSlotsQuery,
  makeReservation,
};
