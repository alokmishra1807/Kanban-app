import express from 'express'
import { createTask, deleteTask, getAllTasks, getUserTasks, updateTask } from '../controlllers/taskControllers.js';
import protectRoute from '../middleware/protectRoute.js';



const router = express.Router();

router.post('/create', createTask);
router.put('/edit/:id',  updateTask);
router.delete('/delete/:id', deleteTask);
router.get('/my-tasks', getUserTasks); 
router.get('/all', getAllTasks);


export default router;
