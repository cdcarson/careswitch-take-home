<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	let user = $derived(data.user);
	let userWorkspace = $derived(data.userWorkspace);
</script>

<svelte:head>
	<title>Workspace User: {user.name} - {userWorkspace.workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Workspaces', href: `/users/${user.id}/workspaces` },
		{
			label: userWorkspace.workspace.name,
			href: `/users/${user.id}/workspaces/${userWorkspace.workspace.id}`
		}
	]}
/>

<main id="main">
	<RouteHeader heading="User Workspace" subheading={userWorkspace.workspace.name} />
	<RouteSection id="workspace-user">
		<TwoColumns>
			<dl class="grid">
				<dt class="font-medium">Workspace</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/workspaces/{userWorkspace.workspace.id}"
						>{userWorkspace.workspace.name}</a
					>
				</dd>
				<dt class="font-medium">User</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/users/{user.id}">{user.name}</a>
				</dd>
			</dl>
			{#snippet right()}
				<Button href="/users/{user.id}/workspaces/{userWorkspace.workspace.id}/remove"
					>Remove User From Workspace</Button
				>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
