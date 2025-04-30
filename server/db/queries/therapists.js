const pool = require("../database");

const getTherapists = () => {
	return pool.query("SELECT id , name, icon FROM therapists;");
};

const insertTherapist = (
	name,
	lastname,
	email,
	phone,
	password,
	icon,
	superadmin
) => {
	const sql = `
			WITH new_therapist AS (
			  INSERT INTO therapists (name, lastname, email, phone, password, icon)
			  VALUES ($1, $2, $3, $4, $5, $6)
			  RETURNING id
			)
			INSERT INTO admins (therapist_id, is_superadmin, created_at, updated_at)
			SELECT id, $7, NOW(), NOW()
			FROM new_therapist
			RETURNING therapist_id;`;
	return pool.query(sql, [
		name,
		lastname,
		email,
		phone,
		password,
		icon,
		superadmin,
	]);
};

const deleteTherapist = (therapist) => {
	const sql = "DELETE FROM therapists WHERE id = $1";
	return pool.query(sql, [therapist]);
};

module.exports = {
	getTherapists,
	insertTherapist,
	deleteTherapist,
};
