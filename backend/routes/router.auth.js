import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../model/User.js';

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ user_name, email, password: hash });

    return res.status(201).json({ message: "User Registered", user_id: user.user_id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////////////////////////////
router.post("/login", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name || !password)
      return res.status(400).json({ message: "user_name and password required" });

    const user =
      (await User.findOne({ where: { user_name } })) ||
      (await User.findOne({ where: { email: user_name } }));

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
