// ReservationController.js yra failas, kuris aprašo rezervacijų valdymo logiką.
const Reservation = require("../models/reservationModel");
const Car = require("../models/carModel");

// Sukuriam rezervaciją
exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;
    // we get user id from the request object which is set by the authMiddleware
    const userId = req.user._id;
    // 1. only registered users can create reservations
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 2. car must be available for the selected dates
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // 3. check if the car is available for the selected dates
    const isCarAvailable = await Reservation.findOne({
      carId,
      // $expr is used to write mongo queries in javascript
      // $or is used to check if the car is available for the selected dates
      // $gte is used to check if the startDate is greater than or equal to the startDate of the reservation
      $expr: {
        $or: [
          { $gte: ["$startDate", startDate] },
          { $gte: ["$endDate", endDate] },
        ],
      },
    });

    if (isCarAvailable) {
      return res
        .status(400)
        .json({ error: "Car is not available for the selected dates" });
    }

    // 3. calculate total price based on the car's price per day
    const totalPrice = car.price * totalDays;

    // 4. create reservation
    const reservation = new Reservation({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
    });
    await reservation.save();

    // 5. return reservation details
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id })
      // populate the carId field with the car details
      .populate("carId", "make model image price")
      // lean() is used to return the raw data from the database
      .lean();

    // Transform the response to include car details directly
    const transformedReservations = reservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
    }));

    res.status(200).json(transformedReservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get reservations" });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
};

// ADMIN
exports.getAllReservations = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized. Admin access required" });
    }

    const allReservations = await Reservation.find()
      .populate("carId", "make model image price")
      .populate("userId", "name email")
      .lean();

    const formattedReservations = allReservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
      user: reservation.userId,
      userId: reservation.userId._id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get all reservations" });
  }
};
