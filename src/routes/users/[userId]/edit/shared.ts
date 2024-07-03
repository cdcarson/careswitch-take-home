import { z } from 'zod';

export const editUserSchema = z.object({
	name: z.string().trim().min(1).max(320),
	email: z.string().trim().toLowerCase().email().max(320)
});

export type EditUserSchema = typeof editUserSchema;
