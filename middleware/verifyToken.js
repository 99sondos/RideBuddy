const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kontrollera om token finns
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Ingen token – åtkomst nekad" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifiera och dekoda token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Sätt användarinformation i req.user
    next();  // Fortsätt till nästa middleware eller rutt
  } catch (err) {
    console.error("Token verification error:", err);  // Logga detaljerat fel
    return res.status(401).json({ message: "Ogiltig token" });
  }
};

module.exports = verifyToken;

