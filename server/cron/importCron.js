const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const pool = require("../db/database");
const { generate: generateMock } = require("../utils/generateMock");
console.log(">>> FILE LOADED");

function formatDateTime(date) {
	return date.toISOString().slice(0, 19).replace("T", " ");
}

async function loadTherapists() {
	const res = await pool.query(
		`SELECT id, name, lastname FROM therapists ORDER BY id`
	);
	return res.rows;
}

async function loadServices() {
	const res = await pool.query(`SELECT id, name FROM services ORDER BY id`);
	return res.rows;
}

async function runBookingsInsert() {
	try {
		const mockPath = path.join(__dirname, "../data/mockBookings.json");
		const templates = JSON.parse(fs.readFileSync(mockPath, "utf8"));

		const therapists = await loadTherapists();
		const services = await loadServices();

		// insert templates — each tpl should now have a `date` (YYYY-MM-DD) + `time` (HH:MM)
		const insertPromises = templates.map(async (tpl, index) => {
			const therapist = therapists.find((t) => t.id === tpl.therapist_id);
			const service = services.find((s) => s.id === tpl.service_id);

			if (!therapist || !service) {
				console.warn("Invalid service/therapist in template:", tpl);
				return;
			}

			// Build the exact start datetime from tpl.date (YYYY-MM-DD) and tpl.time (HH:MM)
			// Example: "2025-12-02" + "13:30" -> new Date("2025-12-02T13:30:00")
			const start = new Date(`${tpl.date}T${tpl.time}:00`);
			const end = new Date(start);
			end.setMinutes(end.getMinutes() + tpl.duration_minutes);

			// created_at should be some time *before* the slot.
			// We'll set it to 1..5 days before the start (random) at a typical reservation time (e.g. 11:29:23)
			const daysBefore = Math.floor(Math.random() * 5) + 1; // 1..5
			const createdAt = new Date(start);
			createdAt.setDate(createdAt.getDate() - daysBefore);
			// keep time-of-day for created_at more human
			createdAt.setHours(11, 29, Math.floor(Math.random() * 1000), 0);

			const napomena = tpl.napomena_template
				.replace("{DAY}", String(start.getDate()).padStart(2, "0"))
				.replace("{MONTH}", String(start.getMonth() + 1).padStart(2, "0"))
				.replace("{TIME}", tpl.time)
				.replace("{NAME}", therapist.name)
				.replace("{LASTNAME}", therapist.lastname)
				.replace("{SERVICE}", service.name);

			const timeRange = `["${formatDateTime(start)}", "${formatDateTime(
				end
			)}")`;

			await pool.query(
				`INSERT INTO bookings (user_id, service_id, therapist_id, napomena, time_range, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
				[
					tpl.user_id,
					tpl.service_id,
					tpl.therapist_id,
					napomena,
					timeRange,
					formatDateTime(createdAt), // pass created_at explicitly
				]
			);
		});

		await Promise.all(insertPromises);
		console.log("✅ Mock bookings inserted successfully.");
	} catch (err) {
		console.error("❌ Cron error:", err);
	}
}

// Run every Monday at 01:00
cron.schedule("0 1 * * 1", async () => {
	console.log("⏰ Booking cron job initialized");

	const now = new Date();
	const weekNumber = Math.floor(now.getDate() / 7) + 1;

	if (weekNumber % 2 === 1) {
		console.log("🔄 Generating new mock data...");
		await generateMock(); // ⬅ REGENERATE JSON FIRST

		await runBookingsInsert();
	} else {
		console.log("Skipping even-numbered week.");
	}
});

if (require.main === module) {
	(async () => {
		console.log("🔧 Running manual booking import...");
		await generateMock();
		await runBookingsInsert();
	})();
}

module.exports = { runBookingsInsert };
