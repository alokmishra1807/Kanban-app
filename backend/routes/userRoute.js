import express from 'express'
import { getAllUsers, login, logout, signup } from '../controlllers/authControllers.js';
import uploadFile from '../utils/multer.js';
import { getAllTasks } from '../controlllers/taskControllers.js';

const router = express.Router();

router.post("/register",uploadFile,signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/alluser",getAllUsers);


export default router;
