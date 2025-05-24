// models/Listing.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const bidSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  timestamp: Date,
});

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    usedTime: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["item", "service"],
      required: true,
    },
    pricingMode: {
      type: String,
      enum: ["fixed", "bidding", "hourly"],
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    biddingEndTime: Date,
    highestBid: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number,
    },
    bids: [bidSchema],
    condition: {
      type: String,
      enum: ["new", "like new", "good", "fair", "poor"],
      default: "good",
    },
    category: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["university", "global"],
      default: "university",
    },
    images: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    confirmed: { type: Boolean, default: false },
    confirmationDeadline: Date,
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
