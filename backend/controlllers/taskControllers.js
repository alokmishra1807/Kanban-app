import Task from "../models/task.model.js";
import ActionLog from "../models/actionLog.model.js"; // ✅ Import the log model

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const newTask = new Task({
      title,
      description,
      assignedUser: assignedTo,
    });

    await newTask.save();

   
    req.io.emit("taskCreated", newTask);

  
    await ActionLog.create({
      user: req.user._id,
      actionType: "ADD",
      description: `Created task: ${title}`,
    });

    return res.status(201).json({
      _id: newTask._id,
      assignedUser: newTask.assignedUser,
      message: "Task created successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid Task Data" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

   
    req.io.emit("taskUpdated", updatedTask);

    await ActionLog.create({
      user: req.user._id,
      actionType: "EDIT",
      description: `Updated task: ${title}`,
    });

    return res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    req.io.emit("taskDeleted", { _id: id });

    
    await ActionLog.create({
      user: req.user._id,
      actionType: "DELETE",
      description: `Deleted task: ${deletedTask.title}`,
    });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const {id} = req.params;
    const tasks = await Task.find({ assignedUser: id });
    alert(tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Failed to fetch tasks:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
