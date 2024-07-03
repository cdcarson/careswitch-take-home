<script lang="ts">
	import { APP_NAME } from '$lib/constants';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import * as Table from '$lib/components/ui/table';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import SortHeader from '$lib/lists/SortHeader.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ListLayout from '$lib/lists/ListLayout.svelte';

	let { data } = $props();
	let workspace = $derived(data.workspace);
	let list = $derived(data.list);
</script>

<svelte:head>
	<title>Workspace Users: {workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: workspace.name, href: `/workspaces/${workspace.id}` },
		{ label: 'Users', href: `/workspaces/${workspace.id}/users` }
	]}
/>
<main id="main">
	<RouteHeader
		heading="Workspace Users"
		badge={list.unfilteredRecordCount}
		subheading={'Users in the workspace ' + workspace.name}
	/>
	<RouteSection id="list">
		<ListLayout {list} labels={{ singular: 'workspace user', plural: 'workspace users' }}>
			{#snippet buttons()}
				<Button href="/workspaces/{workspace.id}/users/add">Add User to Workspace</Button>
			{/snippet}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">
							<SortHeader {list} key="id">ID</SortHeader>
						</Table.Head>
						<Table.Head>
							<SortHeader {list} key="name">Name</SortHeader>
						</Table.Head>
						<Table.Head>
							<SortHeader {list} key="email">Email</SortHeader>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.records as item (item.userId)}
						{@const user = item.user}
						<Table.Row>
							<Table.Cell class="font-medium">
								<a class="underline" href="/workspaces/{workspace.id}/users/{user.id}">{user.id}</a>
							</Table.Cell>
							<Table.Cell>{user.name}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</ListLayout>
	</RouteSection>
</main>
