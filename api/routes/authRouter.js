import express from "express";
import {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getProfile);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
