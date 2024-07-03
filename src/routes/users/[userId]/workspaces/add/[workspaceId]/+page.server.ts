import { prisma } from '$lib/server/db';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { getUserFromEventOrThrow } from '../../../shared.server';
import { error } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

const addUserToWorkspace = async (event: RequestEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const workspace = await prisma.workspace.findUnique({ where: { id: event.params.workspaceId } });
	if (!workspace) {
		throw error(404, 'Workspace not found');
	}
	const conflict = await prisma.workspaceUserPermission.findFirst({
		where: {
			userId: user.id,
			workspaceId: workspace.id
		}
	});
	if (conflict) {
		throw error(400, 'User already in workspace');
	}
	await prisma.workspaceUserPermission.create({
		data: {
			userId: user.id,
			workspaceId: workspace.id
		}
	});
	redirect(
		`/users/${user.id}/workspaces/${workspace.id}`,
		{ type: 'success', message: 'User added to workspace' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const workspace = await prisma.workspace.findUnique({ where: { id: event.params.workspaceId } });
	if (!workspace) {
		throw error(404, 'Workspace not found');
	}
	return { user, workspace };
};

export const actions: Actions = { default: addUserToWorkspace };
