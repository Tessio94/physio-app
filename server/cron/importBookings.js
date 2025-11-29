const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const pool = require("../db/database");

const { formatDateTime } = require("../utils/utils.js");

function shiftDateTime(original, offsetDays) {
  const date = new Date(original);
  date.setDate(date.getDate() + offsetDays);
  return date;
}

async function runBookingsInsert() {
  try {
    const sqlPath = path.join(
      __dirname,
      "../db/sqlCode/bookings_insert_final.sql"
    );

    const rawSql = fs.readFileSync(sqlPath, "utf8");

    // Extract VALUES rows
    const valuesMatch = rawSql.match(/VALUES\s+([\s\S]*);/i);
    if (!valuesMatch) throw new Error("Could not find VALUES in SQL");

    const valuesBlock = valuesMatch[1].trim();

    // Split into individual row inserts
    const rows = valuesBlock
      .split("),")
      .map((row, i, arr) => (i < arr.length - 1 ? row + ")" : row)) // Re-add trailing )
      .map((r) => r.trim());
    // console.log("rows", rows);

    const offsetDays = 14;

    const updatedRows = rows.map((row) => {
      const matches = [
        ...row.matchAll(/"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})"/g),
      ].map((m) => m[1]);
      console.log("matches", matches);
      const createdAtMatch = row.match(
        /, '(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'\)$/
      );
      console.log("createdAtMatch", createdAtMatch);
      if (!matches || !createdAtMatch) return row; // Fallback

      const startTime = new Date(matches[2]);
      const endTime = new Date(matches[4]);
      const createdAt = new Date(createdAtMatch[1]);

      const newStart = shiftDateTime(startTime, offsetDays);
      const newEnd = shiftDateTime(endTime, offsetDays);
      const newCreated = shiftDateTime(createdAt, offsetDays);
      console.log("break1");
      const newTimeRange = `["${formatDateTime(newStart)}", "${formatDateTime(
        newEnd
      )}")`;
      const newCreatedStr = formatDateTime(newCreated);
      console.log("break2");
      return row
        .replace(matches[0], `"${newTimeRange}"`)
        .replace(createdAtMatch[0], `, '${newCreatedStr}'`);
    });
    console.log("break3");
    console.log("updatedRows", updatedRows);
    // Build final SQL and run it
    const finalSQL = `
        INSERT INTO bookings (user_id, service_id, therapist_id, napomena, time_range, created_at)
        VALUES
        ${updatedRows.join(",\n")};
      `;
    console.log("break4");
    await pool.query(finalSQL);
    console.log("break5");
    console.log("✅ Bookings inserted successfully with updated dates.");
  } catch (error) {
    console.error("❌ Failed to run cron job:", error.message);
  }
}

cron.schedule("0 1 * * 1", async () => {
  const now = new Date();
  const weekNumber = Math.floor(now.getDate() / 7) + 1;

  if (weekNumber % 2 === 1) {
    await runBookingsInsert();
  } else {
    console.log("Skipping this week (even-numbered).");
  }
});

module.exports = { runBookingsInsert };
