const {
	loginGoogle,
	loginGoogleCallback,
} = require("../controllers/loginController");

const express = require("express");
const router = express.Router();

/* login - register */
router.route("/login/google").get(loginGoogle);

router.route("/login/google/callback").get(loginGoogleCallback);

module.exports = router;
