const pool = require("../../database");

const getUsers = () => {
  return pool.query("SELECT * FROM users;");
};

module.exports = {
  getUsers,
};
