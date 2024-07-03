<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import UserDl from './UserDl.svelte';
	import { Button } from '$lib/components/ui/button';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	let { data } = $props();
	let user = $derived(data.user);
</script>

<svelte:head>
	<title>User: {user.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` }
	]}
/>
<main id="main">
	<RouteHeader heading="User" subheading={user.name} />
	<RouteSection id="user">
		<TwoColumns>
			<UserDl {user} />
			{#snippet right()}
				<div class="grid w-48 gap-y-2">
					<Button href="/users/{user.id}/edit">Edit User</Button>
					<Button href="/users/{user.id}/remove">Remove User</Button>
					<Button href="/users/{user.id}/workspaces">Workspaces</Button>
				</div>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
