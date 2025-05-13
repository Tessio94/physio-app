const {
	createNewUser,
	findUserByEmail,
	insertLastLogin,
} = require("../db/queries/admin/users");

const { createState } = require("../utils/utils");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const secret = require("crypto").randomBytes(64).toString("hex");
// console.log(secret);

require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

const JWT_SECRET = process.env.JWT_SECRET;

const loginGoogle = (req, res) => {
	const authorizationURL = new URL(
		"https://accounts.google.com/o/oauth2/v2/auth"
	);

	// see below for generating state
	const state = createState();

	authorizationURL.searchParams.set("client_id", GOOGLE_CLIENT_ID);
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
		client_id: GOOGLE_CLIENT_ID,
		client_secret: GOOGLE_CLIENT_SECRET,
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
		const { given_name, family_name, email } = userInfo;

		const existingUser = await findUserByEmail(email);

		console.log(given_name, family_name, email);

		let insertUser;

		if (existingUser.rows.length === 0) {
			insertUser = await createNewUser({
				name: given_name,
				lastname: family_name,
				email,
			});
			console.log("Created new user", insertUser);
		} else {
			const login = await insertLastLogin(email);
			console.log("Updated last login: ", login.rows[0].last_login);
		}

		const user = existingUser.rows[0] || insertUser.rows[0];

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		// 🍪 Set auth token cookie
		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});
		// console.log("Google user info:", userInfo);

		return res.redirect("http://localhost:5173/book-now");
	} catch (err) {
		console.error("OAuth callback failed:", err);
		return res.status(500).send("OAuth callback failed.");
	}
};

const loginFacebook = (req, res) => {
	const state = createState(); // same helper as used for Google

	const authURL = new URL("https://www.facebook.com/v18.0/dialog/oauth");
	authURL.searchParams.set("client_id", FACEBOOK_CLIENT_ID);
	authURL.searchParams.set(
		"redirect_uri",
		"http://localhost:3000/auth/login/facebook/callback"
	);
	authURL.searchParams.set("state", state);
	authURL.searchParams.set("scope", "email,public_profile");

	res.cookie("facebook_oauth_state", state, {
		maxAge: 10 * 60 * 1000,
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	console.log(authURL);
	res.redirect(authURL.toString());
};

const loginFacebookCallback = async (req, res) => {
	const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = req.cookies.facebook_oauth_state;

	if (!code || !state || !storedState || state !== storedState) {
		return res.status(400).send("Invalid state or missing code.");
	}

	try {
		// Exchange code for access token
		const tokenURL = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/login/facebook/callback&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}`;

		const tokenRes = await fetch(tokenURL);
		const tokenData = await tokenRes.json();

		if (tokenData.error) {
			console.error("Facebook OAuth error:", tokenData.error);
			return res.status(400).send("OAuth token exchange failed.");
		}

		const accessToken = tokenData.access_token;

		// Fetch user profile
		const userInfoRes = await fetch(
			`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${accessToken}`
		);
		const userInfo = await userInfoRes.json();

		const { first_name, last_name, email } = userInfo;

		const existingUser = await findUserByEmail(email);

		let insertUser;

		if (existingUser.rows.length === 0) {
			insertUser = await createNewUser({
				name: first_name,
				lastname: last_name,
				email,
			});
			console.log("Created new Facebook user", insertUser);
		} else {
			const login = await insertLastLogin(email);
			console.log("Updated Facebook login: ", login.rows[0].last_login);
		}

		const user = existingUser.rows[0] || insertUser.rows[0];

		// 🔐 Generate JWT
		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		// 🍪 Set cookie
		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.redirect("http://localhost:5173/book-now");
	} catch (err) {
		console.error("Facebook OAuth callback failed:", err);
		return res.status(500).send("OAuth callback failed.");
	}
};

const register = async (req, res) => {
	console.log(req.body);
	const { name, lastname, email, phone, password } = req.body;

	if (!email || !password || !name || !lastname) {
		return res.status(400).json({ error: "Missing required fields." });
	}

	try {
		const existingUser = await findUserByEmail(email);

		if (existingUser.rows.length > 0) {
			return res.status(409).json({ error: "User already exists." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const registerNewUser = await createNewUser({
			name,
			lastname,
			email,
			phone,
			password: hashedPassword,
		});

		const user = registerNewUser.rows[0];
		console.log(registerNewUser);

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 1000,
		});

		return res.status(201).json({ message: "User registered successfully." });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	console.log(email, password);
	try {
		const userResult = await findUserByEmail(email);

		if (userResult.rows.length === 0) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const user = userResult.rows[0];
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		await insertLastLogin(email);

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.json({ message: "Login successful." });
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
};

const logoutUser = async (req, res) => {
	console.log("laweee");
	res.clearCookie("auth_token");
	res.json({ message: "Logged out." });
};

const getCurrentUser = async (req, res) => {
	try {
		if (!req.user || !req.user.email) {
			return res.status(400).json({ error: "User email not provided" });
		}

		const user = await findUserByEmail(req.user.email);

		if (user.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			name: user.rows[0].name,
			lastname: user.rows[0].lastname,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	loginGoogle,
	loginGoogleCallback,
	loginFacebook,
	loginFacebookCallback,
	register,
	login,
	logoutUser,
	getCurrentUser,
};
