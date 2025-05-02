const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kolla om token finns
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Ingen token – åtkomst nekad" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // t.ex. { id: "...", role: "user" }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Ogiltig token" });
  }
};

module.exports = verifyToken;
