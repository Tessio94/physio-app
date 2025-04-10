const pool = require("../db/database");

// add error handling -> try catch
// sql inputs sanitization (to prevent sql injection)
// no middleware for this one...
// Concurrency: The two queries are independent, so you can execute them concurrently to improve performance using Promise.all.
const getAllServices = async (req, res) => {
  try {
    const [resultServices, resultEmployees] = await Promise.all([
      pool.query("SELECT name FROM services;"),
      pool.query("SELECT name FROM employees;"),
    ]);

    res
      .status(200)
      .send({ services: resultServices.rows, employees: resultEmployees.rows });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAvaliableSlots = async (req, res) => {
  const params = req.params;
  console.log(params);

  res.send("these are your avaliable slots...");
};

module.exports = { getAllServices, getAvaliableSlots };
