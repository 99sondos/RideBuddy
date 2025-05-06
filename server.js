/*require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Så vi kan läsa JSON från req.body

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Starta servern
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server kör på port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB-anslutningsfel:", err));

*/

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // 👈 Lägg till mongoose

const app = express();
app.use(express.json());

// Importera routes
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");

// Använd routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// 👉 Anslut till databasen
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Ansluten till databasen");

    // Starta servern först när databasen är ansluten
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servern är igång på port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Kunde inte ansluta till databasen", err);
  });

