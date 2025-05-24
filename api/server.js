import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import cookieSession from "cookie-session";
import "./config/passport.js";

import authRouter from "./routes/authRouter.js";
import router from "./routes/googleAuth.js";
import upload from "./routes/upload.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/auth", router);
app.use("/api", upload);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
