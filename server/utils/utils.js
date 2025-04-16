function generateAppointmentsByDay(slots) {
	const result = {};

	slots.forEach(({ available }, i) => {
		const [rawStart, rawEnd] = JSON.parse(available.replace(")", "]"));

		const start = new Date(rawStart);
		const end = new Date(rawEnd);

		const dayKey = start.toISOString().split("T")[0]; // e.g., "2025-04-22"

		if (!result[dayKey]) {
			result[dayKey] = [];
		}

		const current = new Date(start);
		// console.log(`${i} current :`, current);
		// console.log(`${i} end :`, end);
		while (current < end) {
			const time = current.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			}); // e.g., "08:30"

			result[dayKey].push(time);
			current.setMinutes(current.getMinutes() + 30);
		}
	});

	return result;
}

module.exports = {
	generateAppointmentsByDay,
};
