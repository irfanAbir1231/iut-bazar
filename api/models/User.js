import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,

      required: function () {
        return !this.googleId;
      },
    },
    googleId: { type: String, unique: true, sparse: true },
    university: String,
    department: String,
    program: String,
    year: String,
    credits: {
      type: Number,
      default: 1000,
    },
    phone: String,
    dob: Date,
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
