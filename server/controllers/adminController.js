const { getUsers } = require("../db/queries/admin/users");
const { formatUserDate } = require("../utils/utils");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    const formattedUsers = users.rows.map((user) => {
      let { name, lastname, email, phone, registration_date } = user;
      let date = formatUserDate(registration_date);
      console.log(date);

      return { name, lastname, email, phone, date };
    });
    const allUSers = res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
};
