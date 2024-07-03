import { prisma } from '$lib/server/db';
import type { WorkspaceListItem } from '../shared';
import { error, type RequestEvent } from '@sveltejs/kit';

export const getWorkspaceFromEventOrThrow = async (
	event: RequestEvent<{ workspaceId: string }>
): Promise<WorkspaceListItem> => {
	const workspace = await prisma.workspace.findUnique({
		where: {
			id: event.params.workspaceId
		},
		include: {
			_count: {
				select: { userPermissions: true }
			}
		}
	});
	if (!workspace) {
		throw error(404, 'Workspace not found');
	}
	return workspace;
};
