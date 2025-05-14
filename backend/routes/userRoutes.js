const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Patikrinkite, ar tai importuojama teisingai

// Atkreipkite dėmesį, kad jūs naudojate authMiddleware prieš getAllUsers
router.get("/", authMiddleware, getAllUsers); // Tuo užtikrinsite, kad tik autentifikuoti vartotojai gali pasiekti šį maršrutą

module.exports = router;
