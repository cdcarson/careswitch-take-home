import { z } from 'zod';

export const editWorkspaceSchema = z.object({
	name: z.string().trim().min(1).max(320),
	description: z.string().trim().max(1000)
});

export type EditWorkspaceSchema = typeof editWorkspaceSchema;
