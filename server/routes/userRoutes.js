const {
  getAllServices,
  getAvaliableSlots,
} = require("../controllers/bookController");

const express = require("express");
const router = express.Router();

router.route("/booknow").get(getAllServices);

router.route("/booknow/:id").get(getAvaliableSlots);

module.exports = router;
