<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { APP_NAME } from '$lib/constants.js';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import TwoColumns from '$lib/route-layouts/TwoColumns.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<RouteBreadcrumbs crumbs={[]}></RouteBreadcrumbs>

<main id="main">
	<RouteHeader heading={APP_NAME} />

	<RouteSection id="users">
		<TwoColumns>
			<dl class="grid grid-cols-2">
				<dt class="font-medium">Users</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/users">{data.userCount} user(s)</a>
				</dd>
			</dl>
			{#snippet right()}
				<div class="grid w-48 gap-2">
					<Button href="/users">View Users</Button>
					<Button href="/users/create">Create User</Button>
				</div>
			{/snippet}
		</TwoColumns>
	</RouteSection>
	<RouteSection id="workspaces">
		<TwoColumns>
			<dl class="grid grid-cols-2">
				<dt class="font-medium">Workspaces</dt>
				<dd class="mb-4 last:mb-0">
					<a class="underline" href="/workspaces">{data.workspaceCount} workspace(s)</a>
				</dd>
			</dl>
			{#snippet right()}
				<div class="grid w-48 gap-2">
					<Button href="/workspaces">View Workspaces</Button>
					<Button href="/workspaces/create">Create Workspace</Button>
				</div>
			{/snippet}
		</TwoColumns>
	</RouteSection>
</main>
