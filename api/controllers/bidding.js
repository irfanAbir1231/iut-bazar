import createError from "http-errors";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

export const placeBid = async (req, res, next) => {
  try {
    const { listingId, amount } = req.body;
    const userId = req.user.id;

    const listing = await Listing.findById(listingId)
      .populate("bids.user")
      .populate("highestBid.user");
    if (!listing || listing.pricingMode !== "bidding")
      throw createError(404, "Listing not found or not a bidding item");

    if (new Date() > listing.biddingEndTime)
      throw createError(400, "Bidding time has ended");

    const user = await User.findById(userId);
    if (!user || user.credits < amount)
      throw createError(400, "Insufficient credits");

    if (listing.highestBid?.amount && amount <= listing.highestBid.amount) {
      throw createError(400, "Bid must be higher than the current highest");
    }

    // Deduct credit
    user.credits -= amount;
    await user.save();

    // Refund previous highest bidder later

    // Save bid
    listing.bids.push({ user: userId, amount, timestamp: new Date() });
    listing.highestBid = { user: userId, amount };

    // Set bidding end time if first bid
    if (!listing.biddingEndTime) {
      listing.biddingEndTime = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    }

    await listing.save();

    res.status(200).json({ message: "Bid placed successfully" });
  } catch (err) {
    next(err);
  }
};

export const concludeBidding = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId)
    .populate("bids.user")
    .populate("highestBid.user");
  if (!listing) return;

  if (new Date() < listing.biddingEndTime) return;

  const allBidders = listing.bids.map((bid) => bid.user._id.toString());
  const uniqueBidders = [...new Set(allBidders)];

  for (const uid of uniqueBidders) {
    if (uid !== listing.highestBid.user._id.toString()) {
      const u = await User.findById(uid);
      const userBids = listing.bids.filter(
        (b) => b.user._id.toString() === uid
      );
      const total = userBids.reduce((sum, b) => sum + b.amount, 0);
      u.credits += total;
      await u.save();
    }
  }

  listing.confirmationDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hrs
  await listing.save();
  res.status(200).json({
    message: "Bidding concluded successfully",
    highestBid: listing.highestBid,
    winner: listing.highestBid.user,
  });
};

export const confirmTransaction = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);

    if (!listing || listing.owner.toString() !== req.user.id) {
      throw createError(403, "Unauthorized");
    }

    listing.confirmed = true;
    listing.status = "approved";
    await listing.save();
    res.status(200).json({ message: "Transaction confirmed" });
  } catch (err) {
    next(err);
  }
};

export const handleUnconfirmedListings = async (req, res) => {
  const expiredListings = await Listing.find({
    confirmed: false,
    confirmationDeadline: { $lt: new Date() },
  }).populate("highestBid.user");

  for (const listing of expiredListings) {
    const winner = await User.findById(listing.highestBid.user);
    winner.credits += listing.highestBid.amount;
    await winner.save();
    listing.confirmed = false;
    await listing.save();
  }

  res.status(200).json({
    message: "Unconfirmed listings handled successfully",
    listings: expiredListings,
  });
};
