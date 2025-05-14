// Controller - valdo logikam kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Car = require("../models/carModel");
const Reservations = require("../models/reservationModel");

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

exports.getCarById = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found!" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch car" });
  }
};

// ADMIN ONLY
exports.createCar = async (req, res) => {
  try {
    // authMiddleware atiduoda mums user objekta!
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized. Admin access required" });
    }

    const newCar = new Car(req.body);
    await newCar.save();

    res.status(201).json({ message: "Car created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create car",
    });
  }
};

// Patch - update
exports.updateCar = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized. Admin access required" });
    }

    const carId = req.params.id;
    const updates = req.body;

    const newCar = await Car.findByIdAndUpdate(carId, updates, { new: true });

    if (!newCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({
      message: "Car updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update car",
    });
  }
};

// ADMIN ONLY
exports.deleteCar = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized. Admin access required" });
    }

    const carId = req.params.id;

    // Delete all reservations for this car
    await Reservations.deleteMany({ carId: carId });

    // Delete the car
    await Car.findByIdAndDelete(carId);

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete car",
    });
  }
};
