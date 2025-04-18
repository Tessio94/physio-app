function generateAvailabilityMap(slots) {
	const result = {};

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
			if (!result[dateKey]) result[dateKey] = {};

			// Ensure time exists
			if (!result[dateKey][timeKey]) result[dateKey][timeKey] = [];

			// Add therapist if not already in the array
			if (!result[dateKey][timeKey].includes(therapist_id)) {
				result[dateKey][timeKey].push(therapist_id);
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
	};

	const seenTherapistIds = new Set();
	const seenServiceIds = new Set();

	slots.forEach(
		({
			therapist_id,
			therapist_name,
			therapist_lastname,
			therapist_icon,
			service_id,
			service_name,
			service_icon,
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
		}
	);

	return result;
}
module.exports = {
	generateAvailabilityMap,
	generateDetails,
};
