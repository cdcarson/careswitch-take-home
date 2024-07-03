<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	let workspace = $derived(data.workspace);
	let workspaceUser = $derived(data.workspaceUser);
</script>

<svelte:head>
	<title>Remove Workspace User: {workspaceUser.user.name} - {workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: workspace.name, href: `/workspaces/${workspace.id}` },
		{ label: 'Users', href: `/workspaces/${workspace.id}/users` },
		{
			label: workspaceUser.user.name,
			href: `/workspaces/${workspace.id}/users/${workspaceUser.user.id}`
		},
		{
			label: 'Remove',
			href: `/workspaces/${workspace.id}/users/${workspaceUser.user.id}/remove`
		}
	]}
/>
<main id="main">
	<RouteHeader heading="Remove Workspace User" subheading={workspaceUser.user.name} />
	<RouteSection id="workspace-user">
		<TwoColumns>
			<dl class="grid">
				<dt class="font-medium">Workspace</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/workspaces/{workspace.id}">{workspace.name}</a>
				</dd>
				<dt class="font-medium">User</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/users/{workspaceUser.user.id}">{workspaceUser.user.name}</a>
				</dd>
			</dl>
			{#snippet right()}
				<form method="post" class="space-y-4">
					<p>
						Remove the user <strong>{workspaceUser.user.name}</strong> from the workspace
						<strong>{workspace.name}</strong>?
					</p>

					<Button type="submit">Yes, Remove User</Button>
				</form>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
