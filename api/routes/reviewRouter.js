import express from "express";

const router = express.Router();
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect, admin } from "../middleware/auth.js";

// GET all reviews
router.get("/", protect, getAllReviews);
// GET review by ID
router.get("/:id", protect, getReviewById);
// POST create a new review
router.post("/", protect, createReview);
// PUT update a review
router.put("/:id", protect, updateReview);
// DELETE a review
router.delete("/:id", protect, admin, deleteReview);

export default router;
