import express from 'express';
import cors from 'cors';
import userRoutes from './modules/users/users.routes';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/task/task.routes';

const app = express();
const prefix = '/api';

app.use(cors());
app.use(express.json());

// routes
app.use(`${prefix}/users`, userRoutes); // users
app.use(`${prefix}/login`, authRoutes); // auth
app.use(`${prefix}/tasks`, taskRoutes); // task

export default app;
