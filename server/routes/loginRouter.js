const {
	loginGoogle,
	loginGoogleCallback,
	loginFacebookCallback,
	loginFacebook,
	register,
	login,
	logoutUser,
	getCurrentUser,
	adminLogin,
	getAdminInfo,
} = require("../controllers/loginController");

const express = require("express");
const { requireAuth, requireAdminAuth } = require("../middleware/requireAuth");
const router = express.Router();

/* login - register */
router.route("/login/google").get(loginGoogle);

router.route("/login/google/callback").get(loginGoogleCallback);

router.route("/login/facebook").get(loginFacebook);

router.route("/login/facebook/callback").get(loginFacebookCallback);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logoutUser);

router.route("/current-user").get(requireAuth, getCurrentUser);

router.route("/admin/login").post(adminLogin);

router.route("/admin/current").get(requireAdminAuth, getAdminInfo);

module.exports = router;
