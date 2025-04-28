const pool = require("../database");

const getTherapists = () => {
	return pool.query("SELECT id , name, icon FROM therapists;");
};

const getTherIds = () => {
	return pool.query("SELECT id  FROM therapists ORDER BY  id ASC;");
};

module.exports = {
	getTherapists,
	getTherIds,
};
