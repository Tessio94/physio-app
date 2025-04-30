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
	addService,
	addServiceForTherapist,
	removeTherapist,
	removeService,
	removeServiceForTherapist,
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

router
	.route("/admin/postavke/add-service-for-therapist")
	.post(addServiceForTherapist);

router.route("/admin/postavke/delete-therapist").delete(removeTherapist);
router.route("/admin/postavke/delete-service").delete(removeService);
router
	.route("/admin/postavke/delete-service-for-therapist")
	.delete(removeServiceForTherapist);

module.exports = router;
