import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { getWorkspaceFromEventOrThrow } from '../../../shared.server';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

const removeUser = async (event: RequestEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const workspaceUser = await prisma.workspaceUserPermission.findUnique({
		where: {
			workspaceId_userId: {
				userId: event.params.userId,
				workspaceId: workspace.id
			}
		}
	});
	if (!workspaceUser) {
		throw error(404, 'Workspace user not found');
	}
	await prisma.workspaceUserPermission.delete({
		where: {
			workspaceId_userId: {
				userId: event.params.userId,
				workspaceId: workspace.id
			}
		}
	});
	redirect(
		`/workspaces/${workspace.id}/users`,
		{ type: 'success', message: 'User removed from workspace' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const workspaceUser = await prisma.workspaceUserPermission.findUnique({
		where: {
			workspaceId_userId: {
				userId: event.params.userId,
				workspaceId: workspace.id
			}
		},
		include: {
			user: true
		}
	});
	if (!workspaceUser) {
		throw error(404, 'Workspace user not found');
	}
	return { workspaceUser, workspace };
};

export const actions: Actions = { default: removeUser };
