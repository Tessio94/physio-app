const fs = require("fs");
const path = require("path");
const pool = require("../db/database");

async function migrateUsers() {
  const filePath = path.join(__dirname, "../data", "users_50_hashed.json");
  console.log(filePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(raw);

  try {
    for (const u of users) {
      await pool.query(
        `
        INSERT INTO users
        (id, name, lastname, email, phone, password, registration_date, last_login)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          u.id,
          u.name,
          u.lastname,
          u.email,
          u.phone,
          u.password,
          u.registration_date,
          u.last_login,
        ]
      );
    }
    console.log("✅ Users migrated successfully");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  }
}

migrateUsers();
