const {
	getAllServicesAndTherapists,
	getAvailableSlots,
} = require("../controllers/bookController");

const express = require("express");
const router = express.Router();

router.route("/book-now").get(getAllServicesAndTherapists);

router.route("/book-now/appointments/:therapistId").get(getAvailableSlots);

module.exports = router;
