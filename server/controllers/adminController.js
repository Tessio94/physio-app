const {
	getUsers,
	getAdminSchedule,
	getBookings,
} = require("../db/queries/admin/users");
const {
	formatUserDate,
	generateAvailabilityMap,
	generateDetails,
	generateBookingDetails,
} = require("../utils/utils");

const getAllUsers = async (req, res) => {
	try {
		const users = await getUsers();
		const formattedUsers = users.rows.map((user) => {
			let { name, lastname, email, phone, registration_date } = user;
			let date = formatUserDate(registration_date);
			console.log(date);

			return { name, lastname, email, phone, date };
		});
		const allUSers = res.status(200).json(formattedUsers);
	} catch (error) {
		console.error("Error fetching available slots:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

const getAdminAppointments = async (req, res) => {
	const { therapistId } = req.params;

	const schedule = await getAdminSchedule(therapistId);
	const bookings = await getBookings();
	// console.log(schedule);
	const availability = generateAvailabilityMap(schedule.rows);
	const appointmentDetails = generateDetails(schedule.rows);
	const bookedSlots = generateBookingDetails(bookings.rows);
	console.log(bookedSlots);

	const appointments = res.status(200).json({
		therapistId,
		availability,
		appointmentDetails,
		bookedSlots,
	});
};

module.exports = {
	getAllUsers,
	getAdminAppointments,
};
