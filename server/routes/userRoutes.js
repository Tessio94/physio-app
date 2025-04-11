const {
	getAllServicesAndTherapists,
	getAvaliableSlots,
} = require("../controllers/bookController");

const express = require("express");
const router = express.Router();

router.route("/book-now").get(getAllServicesAndTherapists);

router.route("/book-now/appointments").get(getAvaliableSlots);

module.exports = router;
