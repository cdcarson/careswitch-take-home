<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import UserDl from '../UserDl.svelte';
	import EditUserForm from './EditUserForm.svelte';
	let { data } = $props();
	let user = $derived(data.user);
</script>

<svelte:head>
	<title>Edit User: {user.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Edit', href: `/users/${user.id}/edit` }
	]}
/>
<main id="main">
	<RouteHeader heading="Edit User" subheading={user.name} />
	<RouteSection id="user">
		<TwoColumns>
			<UserDl {user} />
			{#snippet right()}
				<EditUserForm data={data.form} />
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
