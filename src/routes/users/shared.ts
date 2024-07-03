import type { User } from '@prisma/client';

export type UserListItem = User & { _count: { workspacePermissions: number } };
