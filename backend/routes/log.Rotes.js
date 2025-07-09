import express from "express";


import { getAllLogs } from "../controlllers/logControllers.js";

const router = express.Router();

router.get("/all", getAllLogs);

export default router;