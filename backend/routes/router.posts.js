import { Router } from "express";
import { Parser } from "json2csv";
import { Op } from "sequelize";
import Post from "../model/Posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

/////////////////////////////////////////////////////////
router.post("/", verifyToken, async (req, res) => {
  try {
    const { post_title, content, category, status } = req.body;
    if (!post_title || !content || !category)
      return res.status(400).json({ message: "post_title, content, category required" });

    const post = await Post.create({
      post_title,
      content,
      category,
      status: status || "Draft",
      user_id: req.user.user_id,
    });

    return res.status(201).json({ message: "Post added", post_id: post.post_id });
  } catch (e) {
    console.error(e);
    if (e.name === "SequelizeDatabaseError" || e.name === "SequelizeValidationError")
      return res.status(400).json({ message: e.message });
    return res.status(500).json({ message: "Server error" });
  }
});

///////////////////////////////////////////////////////////////////
router.get("/", verifyToken, async (req, res) => {
  try {
    const { q, status, category } = req.query;
    const where = { user_id: req.user.user_id };

    if (status) where.status = status;
    if (category) where.category = category;
    if (q) {
      where[Op.or] = [
        { post_title: { [Op.iLike]: `%${q}%` } },
        { content: { [Op.iLike]: `%${q}%` } },
      ];
    }

    const posts = await Post.findAll({
      attributes: ["post_id", "post_title", "category", "status", "created_date"],
      where,
      order: [["created_date", "DESC"]],
    });

    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

///////////////////////////////////////////////////////////////////////////
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { post_id: req.params.id, user_id: req.user.user_id },
      attributes: [
        "post_id",
        "post_title",
        "content",
        "category",
        "status",
        "created_date",
        "updated_date",
      ],
    });
    if (!post) return res.status(404).json({ message: "Not found" });
    return res.json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

////////////////////////////////////////////////////////////////////////
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { post_title, content, category, status } = req.body;

    const [count] = await Post.update(
      { post_title, content, category, status },
      {
        where: { post_id: req.params.id, user_id: req.user.user_id },
        individualHooks: true,
      }
    );

    if (count === 0) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Post updated" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

////////////////////////////////////////////////////////////////////////
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const count = await Post.destroy({
      where: { post_id: req.params.id, user_id: req.user.user_id },
    });
    if (!count) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Post removed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/////////////////////////////////////////////////////////////////////////
router.get("/export.csv", verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["post_id", "post_title", "category", "status", "created_date"],
      where: { user_id: req.user.user_id },
      order: [["created_date", "DESC"]],
      raw: true,
    });

    const parser = new Parser({
      fields: ["post_id", "post_title", "category", "status", "created_date"],
    });
    const csv = parser.parse(posts);

    res.header("Content-Type", "text/csv");
    res.attachment("blog_posts.csv");
    return res.send(csv);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
