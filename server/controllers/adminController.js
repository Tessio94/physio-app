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
  addUnavailability,
} = require("../db/queries/admin/users");
const {
  getServices,
  insertService,
  getTherapistsServices,
  insertServiceForTherapist,
  deleteService,
  deleteServiceForTherapist,
} = require("../db/queries/services");
const {
  insertTherapist,
  deleteTherapist,
} = require("../db/queries/therapists");
const {
  formatUserDate,
  generateAvailabilityMap,
  generateDetails,
  generateBookingDetails,
  formatDateTime,
  splitUnavailableSlots,
} = require("../utils/utils");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    const formattedUsers = users.rows.map((user) => {
      let { name, lastname, email, phone, registration_date } = user;
      let date = formatUserDate(registration_date);

      return { name, lastname, email, phone, date };
    });
    const allUSers = res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAdminAppointments = async (req, res) => {
  const therapistId = Number(req.params.therapistId);

  if (isNaN(therapistId)) {
    return res.status(400).json({ error: "Invalid therapist ID" });
  }

  const schedule = await getAdminSchedule(therapistId);
  const bookings = await getBookings(therapistId);

  const availability = generateAvailabilityMap(schedule.rows);
  const bookedSlots = generateBookingDetails(bookings.rows);

  res.status(200).json({
    therapistId,
    availability,
    bookedSlots,
  });
};

const getAppointmentDetails = async (req, res) => {
  const { userId } = req.params;
  const { timestamp } = req.query;

  const booking = await getBookingDetails(userId, timestamp);

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
  const therapistId = Number(req.params.therapistId);
  if (isNaN(therapistId)) {
    return res.status(400).json({ error: "Invalid therapist ID" });
  }

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
  const servicesList = await getServices();
  const therapistsServices = await getTherapistsServices();
  const formattedAdminList = adminList.rows.map((admin) => {
    let { id, name, lastname, email, phone, is_superadmin, registration_date } =
      admin;
    let date = formatUserDate(registration_date);

    return { id, name, lastname, email, phone, is_superadmin, date };
  });

  res.status(200).json({
    formattedAdminList,
    servicesList: servicesList.rows,
    therapistsServices: therapistsServices.rows,
  });
};

const addTherapist = async (req, res) => {
  const {
    therapistName: name,
    lastname,
    email,
    phone,
    superadmin,
    password,
    therapistImageUrl: icon,
  } = req.body;

  try {
    const result = await insertTherapist(
      name,
      lastname,
      email,
      phone,
      password,
      icon,
      superadmin
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const addService = async (req, res) => {
  const { serviceName: name, serviceImageUrl: icon } = req.body;

  try {
    const result = await insertService(name, icon);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const addServiceForTherapist = async (req, res) => {
  const { therapist_id, service_id } = req.body;

  try {
    const result = await insertServiceForTherapist(therapist_id, service_id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const removeTherapist = async (req, res) => {
  const { therapist_id } = req.body;
  try {
    const result = await deleteTherapist(therapist_id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const removeService = async (req, res) => {
  const { service_id } = req.body;
  try {
    const result = await deleteService(service_id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const removeServiceForTherapist = async (req, res) => {
  const { therapist_id, service_id } = req.body;

  try {
    const result = await deleteServiceForTherapist(therapist_id, service_id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const removeBookingSlots = async (req, res) => {
  const { unavailable_from, unavailable_to, therapist_id } = req.body;

  const start = new Date(unavailable_from);
  const end = new Date(unavailable_to);

  const unavailableSlots = splitUnavailableSlots(start, end);

  // Loop through the unavailable slots and insert them
  for (let slot of unavailableSlots) {
    await addUnavailability(therapist_id, slot);
  }

  // const result = await addUnavailability(therapist_id, timeRange);
  res.status(200).json({ success: true });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
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
  removeBookingSlots,
};
