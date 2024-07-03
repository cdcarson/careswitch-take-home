-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkspaceUserPermission" (
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("workspaceId", "userId")
);
