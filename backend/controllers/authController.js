const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Patikriname ar visi laukai uzpildyti
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Patikriname ar email jau egzistuoja musu duomenu bazeje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Sukuriame nauja vartotoja
    const user = new User({
      name,
      email,
      password,
    });

    user.save();

    // 4. sugeneruojame JWT tokena
    // id - tai yra vartotojo id, kuri leis mums atpazinti kuris cia useris kreipiasi i serveri
    // JWT_SECREN: Serverio slaptazodis, kad niekas negaletu padirbti tokeno
    // expiresIn - tai laikas po kurio tokenas bus nebegaliojantis
    // TOKENAS NERA SAUGOMAS DUOMENU BAZEJE, JIS ATIDUODAMAS NAUDOTOJUI!!!
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .status(201)
      .json({ access_token: token, message: "user registered succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Patikriname ar zmogus uzpilde visus input laukus
    if (!email || !password) {
      return res.json({ error: "All fields are required" });
    }

    // 2. Patikriname ar useris egzistuoja musu duomenu bazeje
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Patikriname ar slaptazodis sutampa su duomenu bazeje esanciu slaptazodziu
    // grazins true/false
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 4. Sugeneruojame JWT tokena kad zmogus galetu issisaugoti i localStorage
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // 5. Atiduodame tokena zmogui
    res
      .status(201)
      .json({ access_token: token, message: "logged in succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
