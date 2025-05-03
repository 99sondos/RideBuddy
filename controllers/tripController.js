const Trip = require("../models/Trip");

// POST /trips – skapa ny resa
// POST /trips – skapa ny resa
exports.createTrip = async (req, res) => {
  try {
    const { startLocation, endLocation, tripDate, capacity } = req.body;

    // Hämta användarens ID från token (req.user kommer från verifyToken)
    const driverId = req.user.id;

    // Skapa en ny resa
    const newTrip = await Trip.create({
      startLocation,
      endLocation,
      tripDate,
      capacity,
      passengers: [driverId]  // Lägg till föraren som passagerare
    });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Fel vid skapande av resa:", err);
    res.status(500).json({ message: "Kunde inte skapa resa.", error: err.message });
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
