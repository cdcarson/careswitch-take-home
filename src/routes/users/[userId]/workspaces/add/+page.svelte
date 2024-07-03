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
	let user = $derived(data.user);
	let list = $derived(data.list);
</script>

<svelte:head>
	<title>Add User to Workspace: {user.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Workspaces', href: `/users/${user.id}/workspaces` },
		{ label: 'Add Workspace', href: `/users/${user.id}/workspaces/add` }
	]}
/>
<main id="main">
	<RouteHeader heading="Add User to Workspace" subheading={user.name} />
	<RouteSection id="list">
		<ListLayout {list} labels={{ singular: 'user', plural: 'users' }}>
			{#snippet buttons()}
				<p class="text-sm text-muted-foreground">
					Browse or search the list of workspaces to add them to this user. Only workspaces to which
					the user does not already belong will show up in the list.
				</p>
			{/snippet}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>
							<SortHeader {list} key="name">Name</SortHeader>
						</Table.Head>

						<Table.Head>Add</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.records as item (item.id)}
						<Table.Row>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>
								<Button href={`/users/${user.id}/workspaces/add/${item.id}`}>Add Workspace</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</ListLayout>
	</RouteSection>
</main>
