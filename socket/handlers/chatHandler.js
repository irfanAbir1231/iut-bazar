import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const upload = multer({ dest: "uploads/" });

const chatSocketHandler = (socket, io) => {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, senderId, receiverId, message }) => {
    const msgObj = {
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
      type: "text",
    };

    io.to(roomId).emit("receiveMessage", msgObj);
  });

  socket.on("sendImage", async ({ roomId, filePath, senderId, receiverId }) => {
    try {
      const result = await uploadToCloudinary(filePath, "chat-images");
      const msgObj = {
        senderId,
        receiverId,
        image: result.secure_url,
        timestamp: new Date(),
        type: "image",
      };
      io.to(roomId).emit("receiveMessage", msgObj);
    } catch (error) {
      console.error("Image upload failed:", error);
      socket.emit("errorMessage", "Image upload failed");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};

export default chatSocketHandler;
