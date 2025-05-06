const { createState } = require("../utils/utils");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const loginGoogle = (req, res) => {
	const authorizationURL = new URL(
		"https://accounts.google.com/o/oauth2/v2/auth"
	);

	console.log(authorizationURL);

	// see below for generating state
	const state = createState();

	authorizationURL.searchParams.set("client_id", CLIENT_ID);
	authorizationURL.searchParams.set(
		"redirect_uri",
		"http://localhost:3000/auth/login/google/callback"
	);
	authorizationURL.searchParams.set("response_type", "code");
	authorizationURL.searchParams.set("state", state);
	authorizationURL.searchParams.set(
		"scope",
		"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
	);

	res.cookie("google_oauth_state", state, {
		maxAge: 10 * 60 * 1000, // 10 minutes
		httpOnly: true,
		secure: false, // true in production with HTTPS
		sameSite: "lax",
	});

	// Redirect the user
	res.redirect(authorizationURL.toString());
};

const loginGoogleCallback = async (req, res) => {
	const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = req.cookies.google_oauth_state;

	// Validate state
	if (!code || !state || !storedState || state !== storedState) {
		return res.status(400).send("Invalid state or missing code.");
	}

	// Exchange code for access token
	const body = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: "http://localhost:3000/auth/login/google/callback", // Must match exactly
	});

	try {
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			body,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		if (result.error) {
			console.error("OAuth error:", result.error);
			return res.status(400).send("OAuth token exchange failed.");
		}

		const accessToken = result.access_token;
		const idToken = result.id_token;

		// Fetch user info
		const userInfoRes = await fetch(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const userInfo = await userInfoRes.json();

		// Do something with userInfo: store in DB, session, etc.
		console.log("Google user info:", userInfo);

		// Redirect to app/dashboard
		return res.redirect("/dashboard"); // or send data back to frontend
	} catch (err) {
		console.error("OAuth callback failed:", err);
		return res.status(500).send("OAuth callback failed.");
	}
};

module.exports = {
	loginGoogle,
	loginGoogleCallback,
};
