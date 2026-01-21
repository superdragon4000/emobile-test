import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().check(z.trim(), z.email(), z.toLowerCase()),
  password: z.string().min(6),
});

export type LoginDtoType = z.infer<typeof LoginDto>;
