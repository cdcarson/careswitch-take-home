import { prisma } from '$lib/server/db';
import type { PageServerLoadEvent } from './$types';
import { getUserFromEventOrThrow } from '../../shared.server';
import { error } from '@sveltejs/kit';

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
	return { userWorkspace, user };
};
