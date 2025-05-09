const {
	loginGoogle,
	loginGoogleCallback,
	loginFacebookCallback,
	loginFacebook,
	register,
	login,
	logoutUser,
} = require("../controllers/loginController");

const express = require("express");
const router = express.Router();

/* login - register */
router.route("/login/google").get(loginGoogle);

router.route("/login/google/callback").get(loginGoogleCallback);

router.route("/login/facebook").get(loginFacebook);

router.route("/login/facebook/callback").get(loginFacebookCallback);

router.route("/register", register);

router.route("/login", login);

router.route("/logout", logoutUser);

module.exports = router;
