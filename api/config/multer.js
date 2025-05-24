import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional
  },
});

const upload = multer({ storage });

export default upload;
