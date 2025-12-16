const {
  getServices,
  getAvailableSlotsQuery,
  makeReservation,
} = require("../db/queries/services");
const { getTherapists } = require("../db/queries/therapists");
const { generateAvailabilityMap, generateDetails } = require("../utils/utils");

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

    const services = await getAvailableSlotsQuery(therapistId, serviceId);

    const serviceDetails = generateDetails(services.rows);
    const availability = generateAvailabilityMap(services.rows);

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
  const user_id = req.user.userId;

  const { service_id, therapist_id, time_range, napomena } = req.body;

  try {
    const reservation = await makeReservation(
      user_id,
      service_id,
      therapist_id,
      time_range,
      napomena
    );

    res.status(201).json(reservation.rows[0]);
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
