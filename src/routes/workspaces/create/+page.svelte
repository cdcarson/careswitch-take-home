<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import CreateWorkspaceForm from './CreateWorkspaceForm.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Create Workspace - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: 'Create', href: `/workspaces/create` }
	]}
/>
<main id="main">
	<RouteHeader heading="Create Workspace" />
	<RouteSection id="create">
		<TwoColumns>
			<CreateWorkspaceForm data={data.form} />
			{#snippet right()}
				Some help with this page. Workspaces are lorem ipsum dolor sit amet consectetur adipisicing
				elit. Sint blanditiis unde deserunt, autem labore libero ipsum totam, ducimus quo nulla,
				animi reprehenderit. Aliquid porro alias earum laborum qui, at voluptatem?
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
