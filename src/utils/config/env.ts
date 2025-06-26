import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  SECRET_KEY: string;
  EXPIRES_IN: string;
  // nodeEnv: string;
}

if (!process.env.SECRET_KEY || !process.env.EXPIRES_IN) {
  throw new Error('Missing environment variables: SECRET_KEY or EXIRES_IN');
}

export const config: Config = {
  PORT: Number(process.env.PORT) ?? 3000,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
  // nodeEnv: process.env.NODE_ENV || 'development',
};
