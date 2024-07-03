<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import CreateUserForm from './CreateUserForm.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Create User - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: 'Create', href: `/users/create` }
	]}
/>
<main id="main">
	<RouteHeader heading="Create User" />
	<RouteSection id="create">
		<CreateUserForm data={data.form} />
	</RouteSection>
</main>
