import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config/env';
import logger from '../utils/logs/logger';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }

  try {
    // DO: preguntar ing
    // return overcall on users routes
    jwt.verify(token!, config.SECRET_KEY, (error, user) => {
      if (error) {
        res.status(403).json({ message: 'Invalid token' });
      }
      // DO: preguntar ing
      // preguntar como podría controlar el tipo de user
      // petición getTask rompe server si no se controla el tipo de
      // user userId => undefined
      // req.user = user;
      (req as any).user = user;
      next();
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
