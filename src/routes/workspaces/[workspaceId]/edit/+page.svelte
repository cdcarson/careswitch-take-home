<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import WorkspaceDl from '../WorkspaceDl.svelte';
	import EditWorkspaceForm from './EditWorkspaceForm.svelte';
	let { data } = $props();
	let workspace = $derived(data.workspace);
</script>

<svelte:head>
	<title>Edit Workspace: {workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: workspace.name, href: `/workspaces/${workspace.id}` },
		{ label: 'Edit', href: `/workspaces/${workspace.id}/edit` }
	]}
/>
<main id="main">
	<RouteHeader heading="Edit Workspace" subheading={workspace.name} />
	<RouteSection id="workspace">
		<TwoColumns>
			<WorkspaceDl {workspace} />
			{#snippet right()}
				<EditWorkspaceForm data={data.form} />
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
