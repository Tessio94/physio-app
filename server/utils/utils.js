function generateAvailabilityMap(slots) {
	const result = {};

	// First, group slots by date for easier pre-building
	const therapistSlotsByDate = {};

	slots.forEach(({ therapist_id, available }) => {
		// Fix closing bracket, parse the JSON
		const [rawStart, rawEnd] = JSON.parse(available.replace(")", "]"));
		const start = new Date(rawStart);
		const end = new Date(rawEnd);

		const current = new Date(start);

		while (current < end) {
			const dateKey = current.toISOString().split("T")[0]; // e.g. "2025-04-17"
			const timeKey = current.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			}); // e.g. "08:30"

			// Ensure date exists
			if (!therapistSlotsByDate[dateKey]) therapistSlotsByDate[dateKey] = {};

			// Ensure time exists
			if (!therapistSlotsByDate[dateKey][timeKey])
				therapistSlotsByDate[dateKey][timeKey] = [];

			// Add therapist if not already in the array
			if (!therapistSlotsByDate[dateKey][timeKey].includes(therapist_id)) {
				therapistSlotsByDate[dateKey][timeKey].push(therapist_id);
			}

			current.setMinutes(current.getMinutes() + 30);
		}
	});

	Object.entries(therapistSlotsByDate).forEach(([dateKey, timeslots]) => {
		result[dateKey] = {};
		let current = new Date(`${dateKey}T08:00:00`);

		for (let i = 0; i < 24; i++) {
			// 08:00 to 19:30 = 24 slots
			const timeKey = current.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			});

			if (timeslots[timeKey]) {
				result[dateKey][timeKey] = timeslots[timeKey];
			}

			current.setMinutes(current.getMinutes() + 30);
		}
	});

	return result;
}

function generateDetails(slots) {
	const result = {
		services: [],
		therapists: [],
		users: [],
	};

	const seenTherapistIds = new Set();
	const seenServiceIds = new Set();
	const seenUsersIds = new Set();

	slots.forEach(
		({
			therapist_id,
			therapist_name,
			therapist_lastname,
			therapist_icon,
			service_id,
			service_name,
			service_icon,
			user_id,
			user_name,
			user_lastname,
			user_phone,
			user_email,
			napomena,
			created_at,
		}) => {
			if (!seenTherapistIds.has(therapist_id)) {
				seenTherapistIds.add(therapist_id);
				result.therapists.push({
					therapistId: therapist_id,
					therapistName: therapist_name,
					therapistLastname: therapist_lastname,
					therapistIcon: therapist_icon,
				});
			}

			if (!seenServiceIds.has(service_id)) {
				seenServiceIds.add(service_id);
				result.services.push({
					serviceId: service_id,
					serviceName: service_name,
					serviceIcon: service_icon,
				});
			}

			if (!seenUsersIds.has(user_id)) {
				seenUsersIds.add(user_id);
				result.users.push({
					userId: user_id,
					userName: user_name,
					userLastName: user_lastname,
					userPhone: user_phone,
					userEmail: user_email,
					napomena,
					created_at,
				});
			}
		}
	);

	return result;
}

function generateBookingDetails(appointments) {
	// console.log(appointments);

	const formatted = {};

	appointments.forEach((entry) => {
		const [rawStart, rawEnd] = JSON.parse(entry.time_range.replace(")", "]")); // e.g. "2025-04-23 08:00:00"
		// console.log("rawStart :", rawStart);

		const [date, time] = rawStart.split(" ");
		const timeFormatted = time.slice(0, 5); // "08:00"

		if (!formatted[date]) {
			formatted[date] = {};
		}

		formatted[date][timeFormatted] = entry.user_id;
	});

	return formatted;
}

function formatUserDate(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
	const d = new Date(date);

	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");

	let hours = d.getHours();
	const minutes = String(d.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
	const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

	return `${year}-${month}-${day} ${formattedTime}`;
}

module.exports = {
	generateAvailabilityMap,
	generateDetails,
	formatUserDate,
	formatDateTime,
	generateBookingDetails,
};
