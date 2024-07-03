import { prisma } from '$lib/server/db';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { removeWorkspaceSchema } from './shared';
import { getWorkspaceFromEventOrThrow } from '../shared.server';

const removeWorkspace = async (event: RequestEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const form = await superValidate(event, zod(removeWorkspaceSchema));
	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	await prisma.workspaceUserPermission.deleteMany({
		where: {
			workspaceId: workspace.id
		}
	});
	await prisma.workspace.delete({
		where: {
			id: workspace.id
		}
	});
	redirect('/workspaces', { type: 'success', message: 'Workspace removed' }, event.cookies);
};

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	return {
		workspace,
		form: await superValidate(zod(removeWorkspaceSchema))
	};
};

export const actions: Actions = { default: removeWorkspace };
