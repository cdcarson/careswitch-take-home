import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { getUserFromEventOrThrow } from '../../../shared.server';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

const removeWorkspace = async (event: RequestEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const userWorkspace = await prisma.workspaceUserPermission.findUnique({
		where: {
			workspaceId_userId: {
				userId: user.id,
				workspaceId: event.params.workspaceId
			}
		}
	});
	if (!userWorkspace) {
		throw error(404, 'Workspace user not found');
	}
	await prisma.workspaceUserPermission.delete({
		where: {
			workspaceId_userId: {
				userId: user.id,
				workspaceId: userWorkspace.workspaceId
			}
		}
	});
	redirect(
		`/users/${user.id}/workspaces`,
		{ type: 'success', message: 'User removed from workspace' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const userWorkspace = await prisma.workspaceUserPermission.findUnique({
		where: {
			workspaceId_userId: {
				userId: user.id,
				workspaceId: event.params.workspaceId
			}
		},
		include: {
			workspace: true
		}
	});
	if (!userWorkspace) {
		throw error(404, 'Workspace user not found');
	}
	return { user, userWorkspace };
};

export const actions: Actions = { default: removeWorkspace };
