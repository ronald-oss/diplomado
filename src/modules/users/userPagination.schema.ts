import { z } from 'zod';

export const userPaginationSchema = z
  .object({
    page: z
      .string()
      .regex(/^\d+$/, { message: 'Page must be a number' })
      .transform(Number)
      .default('1'),
    limit: z.enum(['5', '10', '15', '20']).transform(Number).default('10'),
    search: z.string().optional().default(''),
    orderBy: z.enum(['id', 'username', 'status']).default('id'),
    orderDir: z.enum(['ASC', 'DESC']).default('DESC'),
  })
  .strict();

export type UserPaginationParams = z.infer<typeof userPaginationSchema>;
