const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref to the Car model, to know which car was reserved
      ref: "Car",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref to the User model, to know who made the reservation
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "reservations",
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
