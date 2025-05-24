import express from "express";

const router = express.Router();
import {
  getAllApprovedListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listing.js";

import { upload } from "../middleware/multer.js";

import { protect, admin } from "../middleware/auth.js";
// GET all listings
router.get("/", protect, getAllApprovedListings);
// GET listing by ID
router.get("/:id", protect, getListingById);
// POST create a new listing
router.post("/", protect, upload.array("images", 3), createListing);
// PUT update a listing
router.put("/:id", protect, updateListing);
// DELETE a listing
router.delete("/:id", protect, admin, deleteListing);

export default router;
