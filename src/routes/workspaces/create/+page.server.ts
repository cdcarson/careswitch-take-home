import type { PageServerLoad, Actions, RequestEvent } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { createWorkspaceSchema } from './shared.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';

const createWorkspace = async (event: RequestEvent) => {
	const form = await superValidate(event, zod(createWorkspaceSchema));
	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	const workspace = await prisma.workspace.create({
		data: {
			name: form.data.name,
			description: form.data.description
		}
	});
	redirect(
		`/workspaces/${workspace.id}`,
		{ type: 'success', message: 'Workspace created' },
		event.cookies
	);
};
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(createWorkspaceSchema))
	};
};

export const actions: Actions = {
	default: createWorkspace
};
