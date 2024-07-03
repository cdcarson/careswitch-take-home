import { prisma } from '$lib/server/db';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { removeUserSchema } from './shared';
import { getUserFromEventOrThrow } from '../shared.server';

const removeUser = async (event: RequestEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const form = await superValidate(event, zod(removeUserSchema));
	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	await prisma.workspaceUserPermission.deleteMany({
		where: {
			userId: user.id
		}
	});
	await prisma.user.delete({
		where: {
			id: event.params.userId
		}
	});
	redirect('/users', { type: 'success', message: 'User removed' }, event.cookies);
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	return {
		user,
		form: await superValidate(zod(removeUserSchema))
	};
};

export const actions: Actions = { default: removeUser };
