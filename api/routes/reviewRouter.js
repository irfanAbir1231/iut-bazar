import express from "express";
import {
  createReview,
  getReviewsForUser,
  getFlaggedUsers,
} from "../controllers/review.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/user/:userId", getReviewsForUser);
router.get("/admin/flagged", admin, getFlaggedUsers);

export default router;
