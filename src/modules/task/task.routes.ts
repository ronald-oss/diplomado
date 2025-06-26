import { Router } from 'express';
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  taskDone,
} from './task.controller';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.route('/').get(authenticate, getTasks).post(authenticate, createTask);

router
  .route('/:id')
  .get(authenticate, getTaskById)
  .put(authenticate, updateTask)
  .delete(authenticate, deleteTask)
  .patch(authenticate, taskDone);

export default router;
