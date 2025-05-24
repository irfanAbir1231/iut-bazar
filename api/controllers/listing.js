import Listing from "../models/Listing.js";
import { uploadToCloudinary } from "../utils/cloudinary.js"; // helper function
import createError from "http-errors";

//POST /api/listings
export const createListing = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      price,
      pricingMode,
      visibility,
      category,
      condition,
      university,
      biddingDeadline,
    } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.path, "marketplace")
      );
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((result) => result.secure_url);
    }

    const listing = await Listing.create({
      title,
      description,
      type,
      price,
      pricingMode,
      visibility,
      category,
      condition,
      biddingDeadline,
      owner: req.user._id,
      university,
      status: "pending",
      images: imageUrls,
    });

    res.status(201).json({
      message: "Listing created and pending approval",
      listing,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/listings
export const getAllApprovedListings = async (req, res, next) => {
  try {
    const filters = {
      status: "approved",
      ...(req.query.university && { university: req.query.university }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.condition && { condition: req.query.condition }),
    };

    const listings = await Listing.find(filters).populate(
      "owner",
      "name university"
    );
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

// GET /api/listings/:id
export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "name university department"
    );
    if (!listing || listing.status !== "approved") {
      throw createError(404, "Listing not found or not approved");
    }
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

// PUT /api/listings/:id
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw createError(404, "Listing not found");

    const isOwner =
      listing.owner.toString() === req.user.id || req.user.role === "admin";
    if (!isOwner) throw createError(403, "Unauthorized");

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      // Optional: clear old images from Cloudinary (requires storing public_id)
      // For now, we just add new ones
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.path, "marketplace")
      );
      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map((result) => result.secure_url);

      // Combine with existing or replace (depending on your choice)
      listing.images = [...listing.images, ...newImageUrls];

      // Clean up temp files
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }

    // Update other fields
    Object.assign(listing, req.body);

    await listing.save();
    res.json({ message: "Listing updated", listing });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/listings/:id
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw createError(404, "Listing not found");
    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      throw createError(403, "Unauthorized");
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /api/listings/user/:userId
export const getListingsByUser = async (req, res, next) => {
  try {
    const listings = await Listing.find({ owner: req.params.userId });
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

// GET /api/listings/university/:univ
export const getListingsByUniversity = async (req, res, next) => {
  try {
    const listings = await Listing.find({
      university: req.params.univ,
      status: "approved",
    });
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

// GET /api/listings/search
export const searchListings = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    const query = {
      status: "approved",
    };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const results = await Listing.find(query).populate(
      "owner",
      "name university"
    );
    res.json(results);
  } catch (err) {
    next(err);
  }
};
