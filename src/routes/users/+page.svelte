<script lang="ts">
	import { APP_NAME } from '$lib/constants.js';
	import RouteHeader from '$lib/route-layouts/RouteHeader.svelte';
	import RouteSection from '$lib/route-layouts/RouteSection.svelte';
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import RouteBreadcrumbs from '$lib/route-layouts/RouteBreadcrumbs.svelte';
	import SortHeader from '$lib/lists/SortHeader.svelte';
	import ListLayout from '$lib/lists/ListLayout.svelte';
	let { data } = $props();
	let list = $derived(data.list);
</script>

<svelte:head>
	<title>Users - {APP_NAME}</title>
</svelte:head>

<RouteBreadcrumbs crumbs={[{ label: 'Users', href: '/users' }]} />
<main id="main">
	<RouteHeader heading="Users" badge={list.unfilteredRecordCount} />
	<RouteSection id="list">
		<ListLayout {list} labels={{ singular: 'user', plural: 'users' }}>
			{#snippet buttons()}
				<Button href="/users/add">Add User</Button>
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
						<Table.Head>
							<SortHeader {list} key="workspacePermissions">Workspaces</SortHeader>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.records as user (user.id)}
						<Table.Row>
							<Table.Cell class="font-medium">
								<a class="underline" href="/users/{user.id}">{user.id}</a>
							</Table.Cell>
							<Table.Cell>{user.name}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{user._count.workspacePermissions}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</ListLayout>
	</RouteSection>
</main>
