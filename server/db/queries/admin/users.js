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
		LEFT JOIN services s ON tss.service_id = s.id AND s.id != 99999
		LEFT JOIN bookings b on ajde.therapist_id = b.therapist_id
    LEFT JOIN users u ON b.user_id = u.id;
    `;

  return pool.query(sql, [therapistId]);
};

const getBookings = (therapistId) => {
  const sql = `SELECT * FROM bookings WHERE therapist_id = $1`;
  return pool.query(sql, [therapistId]);
};

const getBookingDetails = (userId, timestamp) => {
  const sql = `SELECT b.created_at, b.napomena, u.name || ' ' || u.lastname AS        user_full_name, u.email, u.phone, u.registration_date, s.name AS service_name, t.name || ' ' || t.lastname AS therapist_full_name
  FROM
  (SELECT * FROM bookings  
  WHERE user_id = $1 AND time_range @> $2::timestamp) b
  LEFT JOIN users u ON b.user_id = u.id
  LEFT JOIN services s ON b.service_id = s.id
  LEFT JOIN therapists t ON b.therapist_id = t.id`;

  return pool.query(sql, [userId, timestamp]);
};

const getUsersByMonth = () => {
  return pool.query(`SELECT
  TO_CHAR(registration_date, 'YYYY-MM') AS month,
  COUNT(*) AS user_count
FROM users
WHERE id != 99999
GROUP BY month
ORDER BY month;`);
};

const getServicesUsage = () => {
  return pool.query(`SELECT
    s.name AS service_name,
    COUNT(*) AS usage_count
  FROM bookings b
  JOIN services s ON s.id = b.service_id AND s.id != 99999
  GROUP BY s.name
  ORDER BY usage_count DESC;`);
};

const getTherapistsUsage = () => {
  return pool.query(`SELECT
  t.name || ' ' || t.lastname AS therapist_name,
  COUNT(*) AS session_count
FROM bookings b
JOIN therapists t ON t.id = b.therapist_id
GROUP BY therapist_name
ORDER BY session_count DESC;`);
};

const getUserCount = (therapistId) => {
  const sql = `SELECT COUNT(DISTINCT user_id) FROM bookings WHERE therapist_id = $1`;
  return pool.query(sql, [therapistId]);
};

const getBookingsCount = (therapistId) => {
  const sql = `SELECT COUNT(*) FROM bookings WHERE therapist_id = $1 AND user_id != 99999;`;
  return pool.query(sql, [therapistId]);
};

const getTopService = (therapistId) => {
  const sql = `SELECT b.service_id, b.total_bookings, s.name
FROM
(SELECT service_id, COUNT(*) AS total_bookings
FROM bookings
WHERE therapist_id = $1
AND user_id != 99999
GROUP BY service_id
ORDER BY total_bookings DESC
LIMIT 1) b
LEFT JOIN services s ON b.service_id = s.id AND s.id != 99999;`;
  return pool.query(sql, [therapistId]);
};

const getTopClient = (therapistId) => {
  const sql = `SELECT b.user_id, b.total_bookings, u.name || ' ' || u.lastname AS user_name
FROM
(SELECT user_id, COUNT(*) AS total_bookings
FROM bookings
WHERE therapist_id = $1
AND user_id != 99999
GROUP BY user_id
ORDER BY total_bookings DESC
LIMIT 1) b
LEFT JOIN users u ON b.user_id = u.id;`;
  return pool.query(sql, [therapistId]);
};

const getBestMonth = (therapistId) => {
  const sql = `SELECT TO_CHAR(created_at, 'YYYY-MM') AS booking_month, COUNT(*) AS total_bookings
FROM bookings
WHERE therapist_id = $1
AND user_id != 99999
GROUP BY booking_month
ORDER BY total_bookings DESC
LIMIT 1;`;
  return pool.query(sql, [therapistId]);
};

const getAdminList = () => {
  return pool.query(`SELECT t.id, t.name, t.lastname, t.email, t.phone,
     a.created_at AS registration_date, a.is_superadmin
FROM admins a 
LEFT JOIN therapists t
ON a.therapist_id = t.id;`);
};

const addUnavailability = (therapist, timeRange) => {
  const sql = `INSERT INTO bookings (user_id, service_id, therapist_id, time_range, napomena, created_at)
                VALUES (
                    99999, 
                    99999, 
                    $1, 
                    $2::tsrange,
                    'ADMIN BLOCK - Vacation',
                    CURRENT_TIMESTAMP
                );`;
  return pool.query(sql, [therapist, timeRange]);
};

const createNewUser = ({
  name,
  lastname,
  email,
  phone = "XXX-XXX-XXXX",
  password = "XXXXXXXX",
}) => {
  console.log("club tropicana", name, lastname, email);
  const sql = `INSERT INTO users (name, lastname, email, phone, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`;
  return pool.query(sql, [name, lastname, email, phone, password]);
};

module.exports = {
  getUsers,
  getAdminSchedule,
  getBookings,
  getBookingDetails,
  getUsersByMonth,
  getServicesUsage,
  getTherapistsUsage,
  getUserCount,
  getBookingsCount,
  getTopService,
  getTopClient,
  getBestMonth,
  getAdminList,
  addUnavailability,
  createNewUser,
};
