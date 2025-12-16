// utils/generateMock.js  (or whatever path you have)
const fs = require("fs");
const path = require("path");

const therapists = [
	{ id: 1, name: "Nikola", lastname: "Horvat" },
	{ id: 2, name: "Marija", lastname: "Kovačević" },
	{ id: 3, name: "Ana", lastname: "Barišić" },
	{ id: 4, name: "Luka", lastname: "Perić" },
	{ id: 5, name: "Ema", lastname: "Jurić" },
	{ id: 6, name: "Dina", lastname: "Vuković" },
];

const therapistServices = {
	1: [1, 2, 3, 4, 5, 6],
	2: [1, 2, 4],
	3: [3, 5],
	4: [2, 6],
	5: [1, 5, 6],
	6: [1, 3, 5, 6],
};

const serviceNames = {
	1: "Elektroterapija",
	2: "Ultrazvučna terapija",
	3: "Manualna terapija",
	4: "Hidroterapija",
	5: "Laserska terapija",
	6: "Kineziterapija",
};

function format(date) {
	return date.toISOString().slice(0, 19).replace("T", " ");
}

function ymd(date) {
	// YYYY-MM-DD
	return date.toISOString().slice(0, 10);
}

function generate() {
	const results = [];
	const startDate = new Date();
	startDate.setHours(8, 0, 0, 0);

	const totalNeeded = 600;
	const daysWindow = 14;

	// compute (integer) bookings per day (distribute the remainder on early days)
	const basePerDay = Math.floor(totalNeeded / daysWindow); // e.g. 7
	const remainder = totalNeeded % daysWindow; // extra bookings for first `remainder` days

	const occupied = {}; // therapist -> array of occupied timestamps
	for (let t of therapists) occupied[t.id] = [];

	let created = 0;

	for (let day = 0; day < daysWindow && created < totalNeeded; day++) {
		// how many bookings this day
		const perDay = basePerDay + (day < remainder ? 1 : 0);

		for (let slot = 0; slot < perDay && created < totalNeeded; slot++) {
			const therapist =
				therapists[Math.floor(Math.random() * therapists.length)];
			const services = therapistServices[therapist.id];
			const service_id = services[Math.floor(Math.random() * services.length)];

			// Random time in 30-minute slots between 08:00 and 19:30
			const start = new Date(startDate);
			start.setDate(startDate.getDate() + day);
			const hour = 8 + Math.floor(Math.random() * 12); // 8..19
			const minute = Math.random() < 0.5 ? 0 : 30;
			start.setHours(hour, minute, 0, 0);

			const timestamp = start.getTime();
			if (occupied[therapist.id].includes(timestamp)) continue;
			occupied[therapist.id].push(timestamp);

			const end = new Date(start);
			end.setMinutes(end.getMinutes() + 30);

			const user_id = Math.floor(Math.random() * 50) + 1;

			const napomena = `${String(start.getDate()).padStart(2, "0")}.${String(
				start.getMonth() + 1
			).padStart(2, "0")}., ${start.toLocaleTimeString("hr-HR", {
				hour: "2-digit",
				minute: "2-digit",
			})}, ${therapist.name} ${therapist.lastname}, ${
				serviceNames[service_id]
			}`;

			results.push({
				user_id,
				service_id,
				therapist_id: therapist.id,
				napomena_template: napomena,
				duration_minutes: 30,
				time: `${String(start.getHours()).padStart(2, "0")}:${String(
					start.getMinutes()
				).padStart(2, "0")}`,
				// NEW: explicit date (YYYY-MM-DD) so importer can use exact date
				date: ymd(start),
			});

			created++;
		}
	}

	const outPath = path.join(__dirname, "../data/mockBookings.json");
	fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

	console.log("✅ mockBookings.json generated with", created, "rows");
}

if (require.main === module) {
	generate();
}

module.exports = { generate };
