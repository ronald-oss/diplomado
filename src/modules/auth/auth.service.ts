import { prisma } from '../../utils/prisma/prismaClient';

export const userLogin = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return user;
};
