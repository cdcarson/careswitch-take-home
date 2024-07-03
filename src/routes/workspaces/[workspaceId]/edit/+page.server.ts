import { prisma } from '$lib/server/db';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { editWorkspaceSchema } from './shared';
import { getWorkspaceFromEventOrThrow } from '../shared.server';

const editUser = async (event: RequestEvent) => {
	const form = await superValidate(event, zod(editWorkspaceSchema));
	const workspace = await getWorkspaceFromEventOrThrow(event);

	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	await prisma.workspace.update({
		where: {
			id: workspace.id
		},
		data: form.data
	});
	redirect(
		`/workspaces/${event.params.workspaceId}`,
		{ type: 'success', message: 'Workspace saved' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const form = await superValidate(zod(editWorkspaceSchema));
	form.data.name = workspace.name;
	form.data.description = workspace.description || '';
	return {
		workspace,
		form
		
	};
};

export const actions: Actions = { default: editUser };
