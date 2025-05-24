// routes/upload.js
import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.path, // Cloudinary file URL
      public_id: req.file.filename, // Useful for deleting
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
