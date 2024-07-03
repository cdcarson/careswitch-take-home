import type { PageServerLoadEvent } from './$types';
import { getWorkspaceFromEventOrThrow } from './shared.server';

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	return {
		workspace
	};
};
