const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
	const token = req.cookies.auth_token;

	if (!token) return res.status(401).json({ error: "Not authenticated." });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token." });
	}
};

const requireAdminAuth = (req, res, next) => {
	const token = req.cookies.admin_token;

	if (!token)
		return res.status(401).json({ error: "Not authenticated (admin)." });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.admin = decoded; // make admin info available in controllers
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid admin token." });
	}
};

module.exports = { requireAuth, requireAdminAuth };
