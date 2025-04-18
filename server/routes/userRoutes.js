const {
	getAllServicesAndTherapists,
	getAvailableSlots,
	createReservation,
} = require("../controllers/bookController");

const express = require("express");
const router = express.Router();

router.route("/book-now").get(getAllServicesAndTherapists);

router.route("/book-now/appointments/:therapistId").get(getAvailableSlots);

router.route("/book-now/reservations").post(createReservation);

module.exports = router;
