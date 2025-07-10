import express from 'express'
import { getAllUsers, login, logout, signup } from '../controlllers/authControllers.js';
import uploadFile from '../utils/multer.js';


const router = express.Router();

router.post("/register",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/alluser",getAllUsers);


export default router;
