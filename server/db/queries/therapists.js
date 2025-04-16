const pool = require("../database");

const getTherapists = () => {
	return pool.query("SELECT id , name, icon FROM therapists;");
};

module.exports = {
	getTherapists,
};
