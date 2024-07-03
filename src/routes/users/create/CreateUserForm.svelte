<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { createUserSchema, type CreateUserSchema } from './shared';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateUserSchema>>;

	const form = superForm(data, {
		validators: zodClient(createUserSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>The user's full name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email Address</Form.Label>
			<Input type="email" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>The user's email. Must be unique.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Create User</Form.Button>
</form>
