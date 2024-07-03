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
	<title>User Workspaces: {user.name} - {APP_NAME}</title>
</svelte:head>
<RouteBreadcrumbs
	crumbs={[
		{ label: 'Users', href: '/users' },
		{ label: user.name, href: `/users/${user.id}` },
		{ label: 'Workspaces', href: `/users/${user.id}/workspaces` }
	]}
/>
<main id="main">
	<RouteHeader
		heading="User Workspaces"
		subheading={'Workspaces the user ' + user.name + ' belongs to'}
	/>
	<RouteSection id="list">
		<ListLayout {list} labels={{ singular: 'user workspace', plural: 'user workspaces' }}>
			{#snippet buttons()}
				<Button href="/users/{user.id}/workspaces/add">Add User to Workspace</Button>
			{/snippet}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">
							<SortHeader {list} key="id">ID</SortHeader>
						</Table.Head>
						<Table.Head>
							<SortHeader {list} key="name">Workspace</SortHeader>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.records as item (item.workspace.id)}
						{@const workspace = item.workspace}
						<Table.Row>
							<Table.Cell class="font-medium">
								<a class="underline" href="/workspaces/{workspace.id}/users/{user.id}">{user.id}</a>
							</Table.Cell>
							<Table.Cell>{workspace.name}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</ListLayout>
	</RouteSection>
</main>
