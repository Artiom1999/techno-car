// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const reviewsController = require('../controllers/reviewsController');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', reviewsController.getReviews);
router.post('/', reviewsController.createReview);

module.exports = router;
