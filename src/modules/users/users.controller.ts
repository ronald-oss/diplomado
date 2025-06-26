import { Request, Response } from 'express';
import logger from '../../utils/logs/logger';
import { type User } from './user.schema';
import {
  changeStatus,
  create,
  findAll,
  findOne,
  getPaginatedUsers,
  getTaskUser,
  removeUser,
  update,
} from './users.service';
import { userPaginationSchema } from './userPagination.schema';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAll();
    res.json(users);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = await findOne(id);
    res.status(200).json(userId);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await removeUser(id);

    res.status(200).json({
      message: 'User deleted successfully',
      user: deleteUser,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const userUpdate = await update(data, req.params.id);
    res.status(200).json({
      message: 'User updated successfully',
      user: userUpdate,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const user = await create(data);
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const activateInactiveUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await changeStatus(id, status);

    res.status(200).json({
      message: 'User status updated successfully',
      user,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getTaskUser(id);
    // res.status(200).json({
    //   listTask: user,
    // });
    res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const listUsersPaginated = async (req: Request, res: Response) => {
  const parseResult = userPaginationSchema.safeParse(req.query);

  if (!parseResult.success) {
    const detailedErrors: Record<string, string[]> = {};

    for (const issue of parseResult.error.errors) {
      const path = issue.path[0] ?? 'unknown';
      if (!detailedErrors[path]) {
        detailedErrors[path] = [];
      }
      detailedErrors[path].push(issue.message);
    }

    res.status(400).json({
      message: 'Invalid query parameters',
      errors: detailedErrors,
    });
  }

  const params = parseResult.data!;

  try {
    const result = await getPaginatedUsers(params);

    if (result.page > result.pages && result.pages > 0) {
      res.status(400).json({
        message: `Page ${result.page} does not exist. Only ${result.pages} pages available.`,
      });
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
