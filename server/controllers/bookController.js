const pool = require("../db/database");

// add error handling -> try catch
// sql inputs sanitization (to prevent sql injection)
// no middleware for this one...
// Concurrency: The two queries are independent, so you can execute them concurrently to improve performance using Promise.all.
const getAllServicesAndTherapists = async (req, res) => {
  try {
    const [resultServices, resultTherapists] = await Promise.all([
      pool.query("SELECT * FROM services;"),
      pool.query("SELECT id , name, icon  FROM therapists;"),
    ]);

    res.status(200).send({
      services: resultServices.rows,
      therapists: resultTherapists.rows,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAvailableSlots = async (req, res) => {
  const { serviceId, minDate, maxDate } = req.query;

  res.status(200).json([
    {
      serviceId,
      minDate,
      maxDate,
    },
    {
      serviceId,
      minDate,
      maxDate,
    },
    {
      serviceId,
      minDate,
      maxDate,
    },
    {
      serviceId,
      minDate,
      maxDate,
    },
  ]);
};

module.exports = { getAllServicesAndTherapists, getAvailableSlots };
