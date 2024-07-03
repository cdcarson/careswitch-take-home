<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { removeWorkspaceSchema, type RemoveWorkspaceSchema } from './shared';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<RemoveWorkspaceSchema>>;

	const form = superForm(data, {
		validators: zodClient(removeWorkspaceSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-4" use:enhance>
	<p class="font-bold">Are you sure you want to remove this workspace?</p>
	<Form.Field {form} name="confirmed">
		<Form.Control let:attrs>
			<div class="flex gap-x-2">
				<Checkbox {...attrs} bind:checked={$formData.confirmed} />
				<Form.Label>I understand this action cannot be undone.</Form.Label>
			</div>
			<input name={attrs.name} value={$formData.confirmed} hidden />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Remove Workspace</Form.Button>
</form>
