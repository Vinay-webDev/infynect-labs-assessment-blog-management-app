import express from "express";
import multer from "multer";
import User from "../model/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profilePicBase64 = user.profile_pic
      ? `data:image/jpeg;base64,${user.profile_pic.toString("base64")}`
      : null;

    res.json({
      name: user.user_name,
      email: user.email,
      profile_pic: profilePicBase64,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/", verifyToken, upload.single("profile_pic"), async (req, res) => {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, email } = req.body;
    const file = req.file;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.user_name = name || user.user_name;
    user.email = email || user.email;

    if (file) {
      user.profile_pic = file.buffer;
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
