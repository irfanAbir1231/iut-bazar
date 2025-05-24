import User from "../models/User.js";
import createError from "http-errors";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name university department year publicProfile avatarUrl reviews"
    );

    if (!user) throw createError(404, "User not found");

    // Optionally calculate average rating
    const totalReviews = user.reviews?.length || 0;
    const averageRating =
      totalReviews > 0
        ? user.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
        : null;

    res.status(200).json({
      _id: user._id,
      name: user.name,
      university: user.university,
      department: user.department,
      year: user.year,
      publicProfile: user.publicProfile,
      avatarUrl: user.avatarUrl,
      totalReviews,
      averageRating,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id !== id && req.user.role !== "admin") {
      throw createError(403, "Unauthorized");
    }

    const fields = ["bio", "avatarUrl", "department", "year", "publicProfile"];
    const updates = {};

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) throw createError(404, "User not found");

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { university, role, search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (university) query.university = university;
    if (role) query.role = role;
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const users = await User.find(query)
      .select("name email university role status")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({ users, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
};
