-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkspaceUserPermission" (
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("workspaceId", "userId"),
    CONSTRAINT "WorkspaceUserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkspaceUserPermission_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkspaceUserPermission" ("userId", "workspaceId") SELECT "userId", "workspaceId" FROM "WorkspaceUserPermission";
DROP TABLE "WorkspaceUserPermission";
ALTER TABLE "new_WorkspaceUserPermission" RENAME TO "WorkspaceUserPermission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
