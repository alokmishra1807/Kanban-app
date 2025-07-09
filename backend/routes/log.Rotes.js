import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getAllLogs } from "../controlllers/logControllers.js";

const router = express.Router();

router.get("/all", protectRoute, getAllLogs);

export default router;