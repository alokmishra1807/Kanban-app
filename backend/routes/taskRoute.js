import express from 'express'
import { createTask, deleteTask, getAllTasks, getUserTasks, updateTask } from '../controlllers/taskControllers.js';
import protectRoute from '../middleware/protectRoute.js';



const router = express.Router();

router.post('/create', protectRoute, createTask);
router.put('/edit/:id', protectRoute, updateTask);
router.delete('/delete/:id', protectRoute, deleteTask);
router.get('/my-tasks', protectRoute, getUserTasks); 
router.get('/all', protectRoute, getAllTasks);


export default router;
