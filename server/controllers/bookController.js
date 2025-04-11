const pool = require("../db/database");

// add error handling -> try catch
// sql inputs sanitization (to prevent sql injection)
// no middleware for this one...
// Concurrency: The two queries are independent, so you can execute them concurrently to improve performance using Promise.all.
const getAllServicesAndTherapists = async (req, res) => {
	try {
		const [resultServices, resultTherapists] = await Promise.all([
			pool.query("SELECT * FROM services;"),
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

const getAvaliableSlots = async (req, res) => {
	const params = req.query;
	console.log(params);

	res.status(200).send({
		slots: { 1: "10:30", 2: "11:00" },
	});
};

module.exports = { getAllServicesAndTherapists, getAvaliableSlots };
