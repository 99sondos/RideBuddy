const Trip = require("../models/Trip");

// POST /trips – skapa ny resa
exports.createTrip = async (req, res) => {
  try {
    const { from, to, date } = req.body;
    const newTrip = await Trip.create({
      from,
      to,
      date,
      driver: req.user.id, // från verifyToken
    });
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte skapa resa." });
  }
};

// GET /trips – hämta alla resor
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("driver", "name")
      .populate("passengers", "name");
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte hämta resor." });
  }
};

// PATCH /trips/:id/join – gå med i en resa
exports.joinTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Resa hittades inte." });

    // Förhindra dubbletter
    if (trip.passengers.includes(req.user.id)) {
      return res.status(400).json({ message: "Du är redan med i denna resa." });
    }

    trip.passengers.push(req.user.id);
    await trip.save();

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte gå med i resa." });
  }
};
