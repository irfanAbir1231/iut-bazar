import express from "express";
import {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  googleAuthCallback,
} from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getProfile);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

// Google OAuth routes
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  googleAuthCallback
);

export default authRouter;
