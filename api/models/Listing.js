// models/Listing.js
import mongoose from "mongoose";

const { Schema } = mongoose;

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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    biddingDeadline: {
      type: Date,
      default: null,
    },
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
    bids: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
