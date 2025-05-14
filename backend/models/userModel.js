const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // neleidziam susikurti dvieju vartotoju su tuo paciu email
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Pries issaugojant slaptazodi ji uzkoduojame su bcrypt ir paverciame i hash'a
userSchema.pre("save", async function (next) {
  // Jei slaptazodis nebuvo pakeistas, tiesiog einame toliau ir neskaitome kodo is sitos funkcijos
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Uzkoduojame slaptazodi su bcrypt
    // salt - tai papildomas slaptazodis, kuri sugeneruoja ant virsaus egzistuojancio slaptazodzio
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// tikriname ar slaptazodis sutampa su MongoDB ir zmogaus ivestu
userSchema.methods.comparePassword = async function (password) {
  // bcrupt.compare() - palygina du slaptazodzius
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
