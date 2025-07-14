// backend/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { SECRET } from '../config/constants.js'; // your shared secret key

// ✅ Register Controller
export const register = (req, res) => {
  const { username, email, password } = req.body;

  // 1. Check if email already exists
  findUserByEmail(email, (err, results) => {
    if (err) {
      console.error("❌ DB error during email check:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 3. Save new user to DB
    createUser(username, email, hashedPassword, (err, result) => {
      if (err) {
        console.error("❌ Error creating user:", err);
        return res.status(500).json({ message: "Error creating user" });
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully"
      });
    });
  });
};

// ✅ Login Controller
export const login = (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email
  findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = results[0];

    // 2. Compare password with hashed password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 3. Generate JWT Token
    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  });
};
