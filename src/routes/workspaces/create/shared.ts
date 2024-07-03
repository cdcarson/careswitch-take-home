import { z } from 'zod';

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(1).max(320),
	description: z.string().trim().max(1000)
});

export type CreateWorkspaceSchema = typeof createWorkspaceSchema;
