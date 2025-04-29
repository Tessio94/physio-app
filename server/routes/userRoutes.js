const {
	getAllServicesAndTherapists,
	getAvailableSlots,
	createReservation,
} = require("../controllers/bookController");
const {
	getAllUsers,
	getAdminAppointments,
	getAppointmentDetails,
	getAllDashboardData,
	getAllAdminDashboardData,
	getAdminSettings,
	addTherapist,
	getTherapistIDs,
	addService,
} = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.route("/book-now").get(getAllServicesAndTherapists);

router.route("/book-now/appointments/:therapistId").get(getAvailableSlots);

router.route("/book-now/reservations").post(createReservation);

router.route("/admin/dashboard/data").get(getAllDashboardData);

router
	.route("/admin/dashboard/data/:therapistId")
	.get(getAllAdminDashboardData);

router.route("/admin/schedule/:therapistId").get(getAdminAppointments);

router
	.route("/admin/schedule/appointment-details/:userId")
	.get(getAppointmentDetails);

router.route("/admin/korisnici").get(getAllUsers);

router.route("/admin/postavke").get(getAdminSettings);

router.route("/admin/postavke/add-therapist").post(addTherapist);

router.route("/admin/postavke/add-service").post(addService);

// router.route("/admin/postavke/add-service-for-therapist").get(addTherapist);

module.exports = router;
