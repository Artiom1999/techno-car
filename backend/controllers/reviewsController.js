// Controller - valdo logikam kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Review = require('../models/reviewsModel');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createReview = (req, res) => {
  try {
    const { name, rating, description } = req.body;

    if (!name || !rating || !description) {
      return res
        .status(400)
        .json({ error: 'Name, description and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    Review.createReview({ name, rating, description });
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
