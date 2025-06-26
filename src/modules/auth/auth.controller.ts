import { Request, Response } from 'express';
import { matchPassword } from '../../common/matchPassword';
import jwt from 'jsonwebtoken';
import { prisma } from '../../utils/prisma/prismaClient';
import { config } from '../../utils/config/env';
import { userLogin } from './auth.service';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userLogin(username);
  const isMatch = await matchPassword(password, user!.password);

  if (!isMatch) {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
  const secretKey = config.SECRET_KEY;
  const expires = eval(config.EXPIRES_IN) || '1h';
  const token = jwt.sign(
    {
      userId: user!.id,
      status: user!.status,
    },
    secretKey,
    {
      expiresIn: expires,
    },
  );

  res.json({
    token,
  });
};
