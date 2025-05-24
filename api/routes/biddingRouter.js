import express from "express";

import {
  placeBid,
  concludeBidding,
  confirmTransaction,
  handleUnconfirmedListings,
} from "../controllers/bidding.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Place a bid on a listing
router.post("/", protect, placeBid);
// Conclude bidding for a listing
router.post("/conclude/:listingId", protect, concludeBidding);
// Confirm transaction for a listing
router.post("/confirm", protect, confirmTransaction);
// Handle unconfirmed listings
router.post("/unconfirmed", protect, handleUnconfirmedListings);

export default router;
