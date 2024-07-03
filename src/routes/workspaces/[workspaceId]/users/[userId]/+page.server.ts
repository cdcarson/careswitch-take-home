import { prisma } from '$lib/server/db';
import type { PageServerLoadEvent } from './$types';
import { getWorkspaceFromEventOrThrow } from '../../shared.server';
import { error } from '@sveltejs/kit';

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
