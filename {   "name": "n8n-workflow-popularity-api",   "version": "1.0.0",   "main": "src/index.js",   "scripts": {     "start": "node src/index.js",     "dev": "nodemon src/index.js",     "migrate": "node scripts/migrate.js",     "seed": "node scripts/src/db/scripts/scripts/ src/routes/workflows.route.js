import express from "express";
import { getWorkflows } from "../services/workflows.service.js";

const router = express.Router();

// GET /workflows?platform=YouTube&country=US&limit=50
router.get("/", async (req, res) => {
  try {
    const { platform, country, limit = 50, offset = 0 } = req.query;
    const workflows = await getWorkflows({ platform, country, limit, offset });
    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
