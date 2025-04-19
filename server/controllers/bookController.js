const {
  getServices,
  getAvailableSlotsQuery,
  makeReservation,
} = require("../db/queries/services");
const { getTherapists } = require("../db/queries/therapists");
const { generateAvailabilityMap, generateDetails } = require("../utils/utils");

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
    // console.log(therapistId);
    const services = await getAvailableSlotsQuery(therapistId, serviceId);
    console.log(services);
    const serviceDetails = generateDetails(services.rows);
    const availability = generateAvailabilityMap(services.rows);
    // console.log("new code :", availability);

    const appointments = res.status(200).json({
      therapistId,
      serviceId,
      availability,
      serviceDetails,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const createReservation = async (req, res) => {
  console.log(req.body);

  const { user_id, service_id, therapist_id, time_range, napomena } = req.body;
  console.log(time_range);
  try {
    // Perform necessary validations here
    // Example: check if the reservation time is available, etc.

    // Insert reservation into your bookings table (assuming you're using a database)
    const reservation = await makeReservation(
      user_id,
      service_id,
      therapist_id,
      time_range,
      napomena
    );
    console.log(reservation);

    // Send response back with the created reservation
    res.status(201).json(reservation.rows[0]); // Assuming you're using PostgreSQL (or adjust accordingly)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create reservation" });
  }
};

module.exports = {
  getAllServicesAndTherapists,
  getAvailableSlots,
  createReservation,
};
