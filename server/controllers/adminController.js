const {
	getUsers,
	getAdminSchedule,
	getBookings,
	getBookingDetails,
	getUsersByMonth,
	getServicesUsage,
	getTherapistsUsage,
	getUserCount,
	getBookingsCount,
	getTopService,
	getTopClient,
	getBestMonth,
	getAdminList,
} = require("../db/queries/admin/users");
const {
	formatUserDate,
	generateAvailabilityMap,
	generateDetails,
	generateBookingDetails,
	formatDateTime,
} = require("../utils/utils");

const getAllUsers = async (req, res) => {
	try {
		const users = await getUsers();
		const formattedUsers = users.rows.map((user) => {
			let { name, lastname, email, phone, registration_date } = user;
			let date = formatUserDate(registration_date);
			// console.log(date);

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
	const bookings = await getBookings(therapistId);

	const availability = generateAvailabilityMap(schedule.rows);
	const appointmentDetails = generateDetails(schedule.rows);
	const bookedSlots = generateBookingDetails(bookings.rows);
	// console.log(bookedSlots);

	const appointments = res.status(200).json({
		therapistId,
		availability,
		appointmentDetails,
		bookedSlots,
	});
};

const getAppointmentDetails = async (req, res) => {
	const { userId } = req.params;
	const { timestamp } = req.query;
	console.log("userid :", userId);
	console.log("timestamp :", timestamp);
	const booking = await getBookingDetails(userId, timestamp);
	console.log(booking);
	const {
		created_at,
		email,
		napomena,
		phone,
		registration_date,
		service_name,
		therapist_full_name,
		user_full_name,
	} = booking.rows[0];

	const dateOfBooking = formatDateTime(created_at);
	const dateOfRegistration = formatUserDate(registration_date);

	res.status(200).json({
		created_at,
		dateOfBooking,
		email,
		napomena,
		phone,
		dateOfRegistration,
		service_name,
		therapist_full_name,
		user_full_name,
	});
};

const getAllDashboardData = async (req, res) => {
	const monthlyUsers = await getUsersByMonth();
	const serviceUsage = await getServicesUsage();
	const therapistUsage = await getTherapistsUsage();

	res.status(200).json({
		monthlyUsers: monthlyUsers.rows,
		serviceUsage: serviceUsage.rows,
		therapistUsage: therapistUsage.rows,
	});
};

const getAllAdminDashboardData = async (req, res) => {
	const { therapistId } = req.params;

	const userCount = await getUserCount(therapistId);
	const bookingCount = await getBookingsCount(therapistId);
	const serviceCount = await getTopService(therapistId);
	const clientCount = await getTopClient(therapistId);
	const bestMonth = await getBestMonth(therapistId);

	res.status(200).json({
		userCount: userCount.rows[0]?.count || 0,
		bookingCount: bookingCount.rows[0]?.count || 0,
		serviceCount: serviceCount.rows[0] || {},
		clientCount: clientCount.rows[0] || {},
		bestMonth: bestMonth.rows[0] || {},
	});
};

const getAdminSettings = async (req, res) => {
	const adminList = await getAdminList();
	const formattedAdminList = adminList.rows.map((admin) => {
		let { name, lastname, email, phone, is_superadmin, registration_date } =
			admin;
		let date = formatUserDate(registration_date);

		return { name, lastname, email, phone, is_superadmin, date };
	});

	res.status(200).json(formattedAdminList);
};

module.exports = {
	getAllUsers,
	getAdminAppointments,
	getAppointmentDetails,
	getAllDashboardData,
	getAllAdminDashboardData,
	getAdminSettings,
};
