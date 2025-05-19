const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const pool = require("../db/database");

const { formatDateCron } = require("../utils/utils.js");

function shiftDateTime(original, offsetDays) {
  const date = new Date(original);
  date.setDate(date.getDate() + offsetDays);
  return date;
}

cron.schedule("0 1 * * 1", async () => {
  const now = new Date();
  const weekNumber = Math.floor(now.getDate() / 7) + 1;

  if (weekNumber % 2 === 1) {
    try {
      const sqlPath = path.join(
        __dirname,
        "../db/sqlCode/bookings_insert_final.sql"
      );
      const rawSql = fs.readFileSync(sqlPath, "utf8");

      // Extract VALUES rows
      const valuesMatch = rawSQL.match(/VALUES\s+([\s\S]*);/i);
      if (!valuesMatch) throw new Error("Could not find VALUES in SQL");

      const valuesBlock = valuesMatch[1].trim();

      // Split into individual row inserts
      const rows = valuesBlock
        .split("),")
        .map((row, i, arr) => (i < arr.length - 1 ? row + ")" : row)) // Re-add trailing )
        .map((r) => r.trim());

      const offsetDays = 14;

      const updatedRows = rows.map((row) => {
        const match = row.match(/(\[")(.*?)"(, ")(.*?)(".*?\])/);
        const createdAtMatch = row.match(
          /, '(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'\)$/
        );

        if (!match || !createdAtMatch) return row; // Fallback

        const startTime = new Date(match[2]);
        const endTime = new Date(match[4]);
        const createdAt = new Date(createdAtMatch[1]);

        const newStart = shiftDateTime(startTime, offsetDays);
        const newEnd = shiftDateTime(endTime, offsetDays);
        const newCreated = shiftDateTime(createdAt, offsetDays);

        const newTimeRange = `["${formatDateTime(newStart)}", "${formatDateTime(
          newEnd
        )}")`;
        const newCreatedStr = formatDateTime(newCreated);

        // Build final SQL and run it
        const finalSQL = `
        INSERT INTO bookings (user_id, service_id, therapist_id, napomena, time_range, created_at)
        VALUES
        ${updatedRows.join(",\n")};
      `;

        return row
          .replace(match[0], `"${newTimeRange}"`)
          .replace(createdAtMatch[0], `, '${newCreatedStr}'`);
      });

      await pool.query(finalSQL);
      console.log("✅ Bookings inserted successfully with updated dates.");
    } catch (error) {
      console.error("❌ Failed to run cron job:", err.message);
    }
  } else {
    console.log("Skipping this week (even-numbered).");
  }
});
