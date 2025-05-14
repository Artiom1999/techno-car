// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require("express");
const carsController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get("/", carsController.getCars);
router.get("/:id", carsController.getCarById);
router.post("/", authMiddleware, carsController.createCar);
router.patch("/:id", authMiddleware, carsController.updateCar);
router.delete("/:id", authMiddleware, carsController.deleteCar);

module.exports = router;
