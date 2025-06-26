import { hashPassword } from '../../common/hashPassword';
import { UserInterface } from './interfaces/user.interface';
import { prisma } from '../../utils/prisma/prismaClient';
import { Prisma, UserStatus } from '@prisma/client';
import { UserPaginationParams } from './userPagination.schema';

export const findAll = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      // password: true, // Not recommended to return password
      status: true,
    },
    orderBy: {
      id: 'desc',
    },
    where: {
      status: 'active',
    },
  });
  return users;
};

export const findOne = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      // id: true,
      username: true,
      status: true,
    },
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  return user;
};

export const userExists = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    throw new Error('User already exists');
  }

  return user;
};

const userExistsById = async (id: string) => {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    throw new Error('User not found');
    // return { message: 'User not found' };
  }

  return userExists;
};

export const removeUser = async (id: string) => {
  await userExistsById(id);

  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      // id: true,
      username: true,
    },
  });

  return deleteUser;
};

export const create = async (data: UserInterface) => {
  const { username, password } = data;
  await userExists(username);
  const passwordHash = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: passwordHash,
    },
    select: {
      id: true,
      username: true,
      status: true,
    },
  });

  return newUser;
};

export const update = async (data: UserInterface, id: string) => {
  const { username, password, status } = data;
  await userExistsById(id);

  const updateData: Partial<UserInterface> = {};

  if (username !== undefined) updateData.username = username;
  if (status !== undefined) updateData.status = status;

  if (password !== undefined) {
    const passwordHash = await hashPassword(password);
    updateData.password = passwordHash;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      username: true,
      status: true,
    },
  });

  return updatedUser;
};

export const changeStatus = async (
  id: string,
  status: UserStatus | string,
): Promise<{ id: string; username: string; status: UserStatus }> => {
  const allowedStatuses: UserStatus[] = ['active', 'inactive'];

  // Validar si el status enviado es válido
  if (!allowedStatuses.includes(status as UserStatus)) {
    throw new Error(
      `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      status: status as UserStatus,
    },
    select: {
      id: true,
      username: true,
      status: true,
    },
  });

  return updatedUser;
};

export const getTaskUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      tasks: {
        select: {
          name: true,
          done: true,
        },
        where: {
          done: false,
        },
      },
    },
  });

  return user;
};

export const getPaginatedUsers = async ({
  page,
  limit,
  search,
  orderBy,
  orderDir,
}: UserPaginationParams) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        username: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [orderBy]: orderDir.toLowerCase(),
      },
      select: {
        id: true,
        username: true,
        status: true,
      },
    }),
  ]);

  const pages = Math.ceil(total / limit);

  return {
    total,
    page,
    pages,
    data,
  };
};
