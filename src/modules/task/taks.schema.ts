import { z } from 'zod';

export const TaskSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Task name must be at least 3 characters long',
    })
    .max(100, {
      message: 'Task name must not exceed 100 characters',
    }),
  done: z.boolean().default(false).optional(),
  userId: z.string().uuid({
    message: 'User ID must be a valid UUID',
  }),
});

export type Task = z.infer<typeof TaskSchema>;
export const UpdateTaskSchema = TaskSchema.partial();
