<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	let workspace = $derived(data.userWorkspace.workspace);
	let user = $derived(data.user);
</script>

<svelte:head>
	<title>Remove Workspace User: {user.name} - {workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Workspaces', href: `/users/${user.id}/workspaces` },
		{
			label: workspace.name,
			href: `/users/${user.id}/workspaces/${workspace.id}`
		},
		{
			label: 'Remove',
			href: `/users/${user.id}/workspaces/${workspace.id}/remove`
		}
	]}
/>

<main id="main">
	<RouteHeader heading="Remove Workspace User" subheading={user.name} />
	<RouteSection id="workspace-user">
		<TwoColumns>
			<dl class="grid">
				<dt class="font-medium">Workspace</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/workspaces/{workspace.id}">{workspace.name}</a>
				</dd>
				<dt class="font-medium">User</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/users/{user.id}">{user.name}</a>
				</dd>
			</dl>
			{#snippet right()}
				<form method="post" class="space-y-4">
					<p>
						Remove the user <strong>{user.name}</strong> from the workspace
						<strong>{workspace.name}</strong>?
					</p>

					<Button type="submit">Yes, Remove User</Button>
				</form>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
