import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/:id", protect, getUserProfile);
userRouter.put("/:id", protect, updateUserProfile);
userRouter.get("/", protect, admin, getAllUsers);

export default userRouter;
