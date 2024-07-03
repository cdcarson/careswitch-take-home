import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string().trim().min(1).max(320),
	email: z.string().trim().toLowerCase().email().max(320)
});

export type CreateUserSchema = typeof createUserSchema;
