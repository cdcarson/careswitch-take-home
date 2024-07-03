<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';

	import { createWorkspaceSchema, type CreateWorkspaceSchema } from './shared';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateWorkspaceSchema>>;

	const form = superForm(data, {
		validators: zodClient(createWorkspaceSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Workspace Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>The name of the workspace.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>Optional. A short description of the workspace.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Create Workspace</Form.Button>
</form>
