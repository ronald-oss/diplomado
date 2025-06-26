import { Router } from 'express';
import {
  activateInactiveUsers,
  createUser,
  deleteUser,
  getTask,
  getUserById,
  getUsers,
  listUsersPaginated,
  updateUser,
} from './users.controller';
import { validate } from '../../middlewares/validate';
import { UpdateUserSchema, UserSchema } from './user.schema';
import { authenticate } from '../../middlewares/authenticate';
const router = Router();

router
  .get('/', getUsers)
  .post('/', validate(UserSchema), createUser)
  .get('/:id', authenticate, getUserById)
  .delete('/:id', authenticate, deleteUser)
  .put('/:id', authenticate, validate(UpdateUserSchema), updateUser)
  .patch('/:id', authenticate, activateInactiveUsers);

router.get('/:id/tasks', authenticate, getTask);
router.get('/list/pagination', listUsersPaginated);

export default router;
