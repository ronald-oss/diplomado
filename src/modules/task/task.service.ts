import { prisma } from '../../utils/prisma/prismaClient';

export const create = async (userId: string, name: string) => {
  const newTask = await prisma.task.create({
    data: {
      name,
      // done: false,
      userId,
    },
    select: {
      // id: true,
      name: true,
      done: true,
      User: {
        select: {
          username: true,
        },
      },
    },
  });
  return newTask;
};

export const findAll = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      done: true,
    },
    orderBy: {
      // name: 'asc',
      createdAt: 'desc',
    },
  });

  return tasks;
};

export const findOne = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
      userId,
    },
    select: {
      name: true,
      done: true,
    },
  });
  return task;
};

export const update = async (id: string, name: string, userId: string) => {
  const taskUpdated = await prisma.task.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
    },
    select: {
      name: true,
    },
  });
  return taskUpdated;
};

export const remove = async (id: string, userId: string) => {
  const task = await prisma.task.delete({
    where: {
      id,
      userId,
    },
    select: {
      // id: true,
      name: true,
      done: true,
      // userId: true,
      User: {
        select: {
          username: true,
        },
      },
    },
  });
  return task;
};

export const toggleDone = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task || task.userId !== userId) {
    throw new Error('Task not found or not authorized');
  }

  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      done: !task.done,
    },
    select: {
      id: true,
      name: true,
      done: true,
    },
  });

  const message = updatedTask.done
    ? 'Task marked as done'
    : 'Task marked as not done';

  return {
    message,
    task: updatedTask,
  };
};

export const changeStatus = async (
  id: string,
  userId: string,
  done: boolean,
) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task || task.userId !== userId) {
    throw new Error('Task not found or not authorized');
  }

  const taskUpdated = await prisma.task.update({
    where: {
      id,
      userId,
    },
    data: {
      done,
    },
    select: {
      name: true,
      done: true,
    },
  });

  return taskUpdated;
};
