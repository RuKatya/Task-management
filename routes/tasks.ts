import { Router } from 'express';
const router = Router();

//CONTROLLERS
import { handleGetAllTasks, handleAddTask } from '../controllers/tasksController';

//Middleware
import auth from '../middleware/auth';

router
    .get('/', auth, handleGetAllTasks) //get all tasks
    .post('/addremembr', auth, handleAddTask) //add task

module.exports = router;
