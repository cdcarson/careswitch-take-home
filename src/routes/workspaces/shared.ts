import type { Workspace } from '@prisma/client';

export type WorkspaceListItem = Workspace & { _count: { userPermissions: number } };
