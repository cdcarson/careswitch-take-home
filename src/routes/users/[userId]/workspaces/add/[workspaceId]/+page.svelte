<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';

	let { data } = $props();
	let workspace = $derived(data.workspace);
	let user = $derived(data.user);
</script>

<svelte:head>
	<title>Add User to Workspace - {APP_NAME}</title>
</svelte:head>

<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Workspaces', href: `/users/${user.id}/workspaces` },
		{ label: 'Add Workspace', href: `/users/${user.id}/workspaces/add` },
		{ label: workspace.name, href: `/users/${user.id}/workspaces/add/${workspace.id}` }
	]}
/>

<main id="main">
	<RouteHeader heading="Add User to Workspace" subheading={user.name + ' → ' + workspace.name} />
	<RouteSection id="explanation">
		<TwoColumns>
			<form method="POST" class="space-y-4">
				<p>
					Add the user <strong>{user.name}</strong> to the workspace
					<strong>{workspace.name}</strong>?
				</p>

				<Button type="submit">Yes, Add User to Workspace</Button>
			</form>
		</TwoColumns>
	</RouteSection>
</main>
