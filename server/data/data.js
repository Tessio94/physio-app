const { v4: uuidv4 } = require("uuid");

const employees = [
  { id: uuidv4(), name: "Nikola" },
  { id: uuidv4(), name: "Marija" },
  { id: uuidv4(), name: "Ana" },
  { id: uuidv4(), name: "Luka" },
  { id: uuidv4(), name: "Ema" },
  { id: uuidv4(), name: "Dina" },
];

const service = [
  { id: uuidv4(), name: "Electrotherapy", duration: 60, price: 100 },
  { id: uuidv4(), name: "Ultrasound therapy", duration: 30, price: 100 },
  { id: uuidv4(), name: "Manual therapy", duration: 60, price: 70 },
  { id: uuidv4(), name: "Hydrotherapy", duration: 60, price: 80 },
  { id: uuidv4(), name: "Laser therapy", duration: 30, price: 120 },
  { id: uuidv4(), name: "Kinesiotherapy", duration: 30, price: 90 },
];
