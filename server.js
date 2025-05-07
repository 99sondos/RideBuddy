require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db'); // Importera connectDB-funktionen
const cors = require('cors');


const app = express(); // 👈 Detta måste komma innan du använder app.use
app.use(cors());
// Försök att ansluta till databasen
connectDB().then(() => {
  // Om anslutningen är framgångsrik, starta servern
  app.use(express.json()); // Så vi kan läsa JSON från req.body

  // Importera routes
  const authRoutes = require("./routes/auth");
  const tripRoutes = require("./routes/trips");

  // Använd routes
  app.use("/api/auth", authRoutes);
  app.use("/api/trips", tripRoutes);

  // Starta servern
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Servern är igång på port ${PORT}`);
  });
}).catch((err) => {
  // Om det uppstår ett fel vid anslutningen till databasen, logga det
  console.error("MongoDB-anslutningsfel:", err);
  process.exit(1); // Avsluta applikationen om databasen inte går att ansluta
});
