import Review from "../models/Review.js";
import Listing from "../models/Listing.js";
import createError from "http-errors";

// Create a review
export const createReview = async (req, res, next) => {
  try {
    const { reviewee, listing, role, rating, comment } = req.body;

    const exists = await Review.findOne({
      reviewer: req.user._id,
      reviewee,
      listing,
      role,
    });

    if (exists) return next(createError(400, "Review already submitted"));

    const review = await Review.create({
      reviewer: req.user._id,
      reviewee,
      listing,
      role,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    next(err);
  }
};

// Get reviews for a user
export const getReviewsForUser = async (req, res, next) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate("reviewer", "name")
      .sort("-createdAt");
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Admin: get users with bad feedback
export const getFlaggedUsers = async (req, res, next) => {
  try {
    const minReviews = 3;
    const poorRating = 2;

    const users = await Review.aggregate([
      {
        $group: {
          _id: "$reviewee",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $match: {
          avgRating: { $lt: poorRating },
          reviewCount: { $gte: minReviews },
        },
      },
    ]);

    res.json(users);
  } catch (err) {
    next(err);
  }
};
