import type { WorkspaceUserPermission, User } from '@prisma/client';

export type WorkspaceUserListItem = WorkspaceUserPermission & {
	user: User;
};
