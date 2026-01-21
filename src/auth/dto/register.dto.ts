import { z } from 'zod';

export const RegisterDto = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().optional(),
  birthDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date'),
  email: z.string().check(z.trim(), z.email(), z.toLowerCase()),
  password: z.string().min(6),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
