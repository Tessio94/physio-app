const pool = require("../db/database");

// add error handling -> try catch
// sql inputs sanitization (to prevent sql injection)
// no middleware for this one...
// Concurrency: The two queries are independent, so you can execute them concurrently to improve performance using Promise.all.
const getAllServicesAndTherapists = async (req, res) => {
	try {
		const [resultServices, resultTherapists] = await Promise.all([
			pool.query("SELECT id, name, icon FROM services;"),
			pool.query("SELECT id , name, icon  FROM therapists;"),
		]);

		res.status(200).send({
			services: resultServices.rows,
			therapists: resultTherapists.rows,
		});
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

const getAvailableSlots = async (req, res) => {
	try {
		const { id } = req.params;
		const { serviceId } = req.query;

		let services;

		if (id === "all") {
			services = await pool.query(
				`
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
        WHERE upper(available) - lower(available) >= interval '30 min';`
			);
		} else {
			services = await pool.query(
				`
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
        WHERE upper(available) - lower(available) >= interval '30 min' and service_id=$1;`,
				[serviceId]
			);
		}

		res.status(200).json({
			id,
			serviceId,
			avaliableSlots: services.rows,
		});
	} catch (error) {
		console.error("Error fetching available slots:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

module.exports = { getAllServicesAndTherapists, getAvailableSlots };
