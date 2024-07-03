import type { PageServerLoadEvent } from './$types';
import { getUserFromEventOrThrow } from './shared.server';

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	return {
		user
	};
};
