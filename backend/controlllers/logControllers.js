import ActionLog from "../models/actionLog.model.js";


export const getAllLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .populate("user", "fullName email")
      .sort({ timestamp: -1 });

    res.status(200).json({ logs });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};