const express = require("express");
const router = express.Router();
const {
  createTrip,
  getTrips,
  joinTrip,
} = require("../controllers/tripController");
const verifyToken = require("../middleware/verifyToken");

// Alla routes nedan kräver att användaren är inloggad
router.post("/", verifyToken, createTrip);
router.get("/", verifyToken, getTrips);
router.patch("/:id/join", verifyToken, joinTrip);

module.exports = router;
