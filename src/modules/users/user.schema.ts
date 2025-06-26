import { z } from 'zod';

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .max(50, {
      message: 'Username must not exceed 50 characters',
    }),
  password: z.string().min(6).trim(),
  status: z.enum(['active', 'inactive']).default('active').optional(),
});

export type User = z.infer<typeof UserSchema>;
export const UpdateUserSchema = UserSchema.partial();
