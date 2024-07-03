import { prisma } from '$lib/server/db';
import type { UserListItem } from '../shared';

import { error, type RequestEvent } from '@sveltejs/kit';

export const getUserFromEventOrThrow = async (
	event: RequestEvent<{ userId: string }>
): Promise<UserListItem> => {
	const user = await prisma.user.findUnique({
		where: {
			id: event.params.userId
		},
		include: {
			_count: {
				select: { workspacePermissions: true }
			}
		}
	});
	if (!user) {
		throw error(404, 'User not found');
	}
	return user;
};
