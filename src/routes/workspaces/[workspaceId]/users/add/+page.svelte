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
	<title>Add Workspace User: {workspace.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Workspaces', href: '/workspaces' },
		{ label: workspace.name, href: `/workspaces/${workspace.id}` },
		{ label: 'Users', href: `/workspaces/${workspace.id}/users` },
		{ label: 'Add User', href: `/workspaces/${workspace.id}/users/add` }
	]}
/>
<main id="main">
	<RouteHeader heading="Add Workspace User" subheading={workspace.name} />
	<RouteSection id="list">
		<ListLayout {list} labels={{ singular: 'user', plural: 'users' }}>
			{#snippet buttons()}
				<p class="text-sm text-muted-foreground">
					Browse or search the list of users to add them to this workspace. Only users that do not
					currently belong to this workspace will show up in the list.
				</p>
			{/snippet}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>
							<SortHeader {list} key="name">Name</SortHeader>
						</Table.Head>
						<Table.Head>
							<SortHeader {list} key="email">Email</SortHeader>
						</Table.Head>
						<Table.Head>Add</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.records as item (item.id)}
						<Table.Row>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.email}</Table.Cell>
							<Table.Cell>
								<Button href={`/workspaces/${workspace.id}/users/add/${item.id}`}>Add User</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</ListLayout>
	</RouteSection>
</main>
