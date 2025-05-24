import User from "../models/User.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Configure Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g., "http://localhost:5000/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Find or create user in your database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create new user if not found
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value, // Assuming email is available and verified
            // You might want to set a default password or handle it differently for OAuth users
            // password: defaultPassword or generateRandomPassword()
          });
        }
        // Pass the user object to the next step (serialization or callback handler)
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

// Passport serialization/deserialization (optional for stateless APIs, but good practice with Passport)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// Controller function to handle Google OAuth callback success
export const googleAuthCallback = (req, res) => {
  // Passport adds the authenticated user to req.user
  const user = req.user;

  if (user) {
    // Generate your application's token
    const appToken = generateToken(user._id);

    // Redirect to the frontend with the token
    // Make sure process.env.CLIENT_URL is set to your frontend URL (e.g., http://localhost:3001)
    res.redirect(`${process.env.CLIENT_URL}/auth/signin?token=${appToken}`);
  } else {
    // Handle authentication failure (e.g., redirect to login with an error message)
    res.redirect(
      `${process.env.CLIENT_URL}/auth/signin?error=google_auth_failed`
    );
  }
};

// @route   POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/auth/me
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
      `;

    await sendEmail(user.email, "Password Reset Request", message);

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: "Invalid token or expired" });
  }
};
