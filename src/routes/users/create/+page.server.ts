import type { PageServerLoad, Actions, RequestEvent } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { createUserSchema } from './shared.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';

const createUser = async (event: RequestEvent) => {
	const form = await superValidate(event, zod(createUserSchema));
	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	const conflict = await prisma.user.findUnique({
		where: {
			email: form.data.email
		}
	});
	if (conflict) {
		form.errors.email = ['Email already in use'];
		return fail(400, {
			form
		});
	}
	const user = await prisma.user.create({
		data: {
			name: form.data.name,
			email: form.data.email
		}
	});
	redirect(`/users/${user.id}`, { type: 'success', message: 'User created' }, event.cookies);
};
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(createUserSchema))
	};
};

export const actions: Actions = {
	default: createUser
};
