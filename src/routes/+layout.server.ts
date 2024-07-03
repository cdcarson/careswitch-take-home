import { loadFlash } from 'sveltekit-flash-message/server';
import { prisma } from '$lib/server/db';
export const load = loadFlash(async (event) => {
	const data = {
		userCount: await prisma.user.count(),
		workspaceCount: await prisma.workspace.count()
	};
	return data;
});
