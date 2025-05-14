// ReservationRoutes.js yra failas, kuris aprašo maršrutus, susijusius su rezervacijomis.

const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

// POST rezervacijos sukurimas
router.post("/", authMiddleware, reservationController.createReservation);
// GET user reservations
router.get("/", authMiddleware, reservationController.getReservations);
// DELETE reservation
router.delete("/:id", authMiddleware, reservationController.deleteReservation);
// Get ALL reservations ADMIN ONLY
router.get("/all", authMiddleware, reservationController.getAllReservations);

module.exports = router;
