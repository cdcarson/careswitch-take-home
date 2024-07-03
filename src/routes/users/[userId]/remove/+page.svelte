<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import UserDl from '../UserDl.svelte';
	import RemoveUserForm from './RemoveUserForm.svelte';
	let { data } = $props();
	let user = $derived(data.user);
</script>

<svelte:head>
	<title>Remove User: {user.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Remove', href: `/users/${user.id}/remove` }
	]}
/>
<main id="main">
	<RouteHeader heading="Remove User" subheading={user.name} />
	<RouteSection id="user">
		<TwoColumns>
			<UserDl {user} />
			{#snippet right()}
				<RemoveUserForm data={data.form} />
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
