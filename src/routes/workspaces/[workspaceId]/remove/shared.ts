import { z } from 'zod';

export const removeWorkspaceSchema = z.object({
	confirmed: z.boolean().refine((value) => value === true, {
		message: 'You must check the box to confirm you understand.'
	})
});

export type RemoveWorkspaceSchema = typeof removeWorkspaceSchema;
