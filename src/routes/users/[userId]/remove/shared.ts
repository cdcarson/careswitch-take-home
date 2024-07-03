import { z } from 'zod';

export const removeUserSchema = z.object({
	confirmed: z.boolean().refine((value) => value === true, {
		message: 'You must check the box to confirm you understand.'
	})
});

export type RemoveUserSchema = typeof removeUserSchema;
