<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import { Button } from '$lib/components/ui/button';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import WorkspaceDl from './WorkspaceDl.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';

	let { data } = $props();
	let workspace = $derived(data.workspace);
</script>

<svelte:head>
	<title>Workspace: {workspace.name} - {APP_NAME}</title>
</svelte:head>

<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: workspace.name, href: `/workspaces/${workspace.id}` }
	]}
/>
<main id="main">
	<RouteHeader heading="Workspace" subheading={workspace.name} />
	<RouteSection id="workspace">
		<TwoColumns>
			<WorkspaceDl {workspace} />
			{#snippet right()}
				<div class="grid w-48 gap-y-2">
					<Button href="/workspaces/{workspace.id}/edit">Edit Workspace</Button>
					<Button href="/workspaces/{workspace.id}/remove">Remove Workspace</Button>
					<Button href="/workspaces/{workspace.id}/users">View Workspace Users</Button>
					<Button href="/workspaces/{workspace.id}/users/add">Add Workspace User</Button>
				</div>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
