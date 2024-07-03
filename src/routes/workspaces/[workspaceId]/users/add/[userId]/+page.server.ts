import { prisma } from '$lib/server/db';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { getWorkspaceFromEventOrThrow } from '../../../shared.server';
import { error } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

const addUserToWorkspace = async (event: RequestEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const user = await prisma.user.findUnique({ where: { id: event.params.userId } });
	if (!user) {
		throw error(404, 'User not found');
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
		`/workspaces/${workspace.id}/users/${user.id}`,
		{ type: 'success', message: 'User added to workspace' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const user = await prisma.user.findUnique({ where: { id: event.params.userId } });
	if (!user) {
		throw error(404, 'User not found');
	}
	return { user, workspace };
};

export const actions: Actions = { default: addUserToWorkspace };
