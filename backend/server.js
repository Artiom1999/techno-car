// Server.js visada yra pagrindinis failas, kuris paleidžia serverį ir nukreipia maršrutus į atitinkamus failus
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();

// Cors - leidžia siusti API užklausas iš kito domeno pvz. localhost:3000 -> localhost:5173
app.use(cors());
app.use(express.json());
// Nukreipiame visas API užklausas, kurios prasideda /api/cars į carRoutes failą, kuris toliau tvarkys užklausas susijusias su automobiliais.
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
