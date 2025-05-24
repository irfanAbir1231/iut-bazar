// routes/upload.js
import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/chat-image", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.path, "chat");
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

export default router;
