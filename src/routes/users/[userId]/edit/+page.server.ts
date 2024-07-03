import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { editUserSchema } from './shared';
import { getUserFromEventOrThrow } from '../shared.server';

const editUser = async (event: RequestEvent) => {
	const form = await superValidate(event, zod(editUserSchema));
	const user = await getUserFromEventOrThrow(event);

	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	if (form.data.email.toLowerCase() !== user.email.toLowerCase()) {
		const conflict = await prisma.user.findUnique({
			where: {
				email: form.data.email
			}
		});
		if (conflict && conflict.id !== event.params.userId) {
			form.errors.email = ['Email already in use'];
			return fail(400, {
				form
			});
		}
	}

	await prisma.user.update({
		where: {
			id: event.params.userId
		},
		data: form.data
	});
	redirect(
		`/users/${event.params.userId}`,
		{ type: 'success', message: 'User saved' },
		event.cookies
	);
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	return {
		user,
		form: await superValidate(
			{
				name: user.name,
				email: user.email
			},
			zod(editUserSchema)
		)
	};
};

export const actions: Actions = { default: editUser };
