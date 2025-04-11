const pg = require("pg");
const { Pool } = pg;

require("dotenv").config();

const password = process.env.DB_PSSW;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	database: "postgres",
	password: password,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

module.exports = pool;
