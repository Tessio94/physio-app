const {
	getServices,
	getAvailableSlotsQuery,
} = require("../db/queries/services");
const { getTherapists } = require("../db/queries/therapists");
const { generateAvailabilityMap } = require("../utils/utils");

// sql inputs sanitization (to prevent sql injection)
// Concurrency: The two queries are independent, so you can execute them concurrently to improve performance using Promise.all.
const getAllServicesAndTherapists = async (req, res) => {
	try {
		const [resultServices, resultTherapists] = await Promise.all([
			getServices(),
			getTherapists(),
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
		const { therapistId } = req.params;
		const { serviceId } = req.query;
		console.log(therapistId);
		const services = await getAvailableSlotsQuery(therapistId, serviceId);
		// console.log(services);
		const availability = generateAvailabilityMap(services.rows);
		// console.log("new code :", availability);

		const appointments = res.status(200).json({
			therapistId,
			serviceId,
			availability,
		});
	} catch (error) {
		console.error("Error fetching available slots:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

module.exports = {
	getAllServicesAndTherapists,
	getAvailableSlots,
};
