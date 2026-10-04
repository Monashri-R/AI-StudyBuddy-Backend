const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    const safeUser = await User.findById(user._id).select("-password");

    res.status(201).json({
      message: "Registration successful",
      token: createToken(user),
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password || "", user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeUser = await User.findById(user._id).select("-password");

    res.json({
      message: "Login successful",
      token: createToken(user),
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, me };
