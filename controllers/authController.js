import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = new User({ name, email, password });
    const result = await user.save();
    if (result) {
      console.log(`User ${name} is created!`);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      token,
      userId: user._id,
      message: "User created",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user._id,
      message: "Logged In!",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
