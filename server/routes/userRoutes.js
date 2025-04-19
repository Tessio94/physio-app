const {
  getAllServicesAndTherapists,
  getAvailableSlots,
  createReservation,
} = require("../controllers/bookController");
const { getAllUsers } = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.route("/book-now").get(getAllServicesAndTherapists);

router.route("/book-now/appointments/:therapistId").get(getAvailableSlots);

router.route("/book-now/reservations").post(createReservation);

router.route("/admin/korisnici").get(getAllUsers);

module.exports = router;
