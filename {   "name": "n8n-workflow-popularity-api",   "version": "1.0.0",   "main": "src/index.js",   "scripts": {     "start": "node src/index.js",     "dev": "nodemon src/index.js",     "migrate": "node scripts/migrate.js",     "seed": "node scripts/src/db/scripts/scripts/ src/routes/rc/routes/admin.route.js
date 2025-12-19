import express from "express";
import { runAllCollectors } from "../collectors/index.js";

const router = express.Router();

// POST /admin/refresh?key=ADMIN_KEY
router.post("/refresh", async (req, res) => {
  const key = req.query.key;
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await runAllCollectors();
    res.json({ ok: true, message: "Collectors completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error running collectors" });
  }
});

export default router;
