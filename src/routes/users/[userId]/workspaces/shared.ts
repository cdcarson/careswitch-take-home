import type { WorkspaceUserPermission, Workspace } from '@prisma/client';

export type UserWorkspaceListitem = WorkspaceUserPermission & {
	workspace: Workspace;
};
