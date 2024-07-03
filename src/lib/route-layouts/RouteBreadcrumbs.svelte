<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	type Crumb = {
		label: string;
		href: string;
	};
	type P = {
		crumbs: Crumb[];
	};
	const maxShown = 10;
	let { crumbs }: P = $props();
	let shownCrumbs: Crumb[] = $derived(crumbs.slice(crumbs.length - maxShown));
	let dropdownCrumbs: Crumb[] = $derived(crumbs.slice(0, crumbs.length - shownCrumbs.length));
</script>

<div class="mx-auto px-4 pt-4 lg:max-w-screen-lg">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#if dropdownCrumbs.length > 0}
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="flex items-center gap-1">
							<Breadcrumb.Ellipsis class="h-4 w-4" />
							<span class="sr-only">Toggle menu</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							{#each dropdownCrumbs as crumb}
								<DropdownMenu.Item href={crumb.href}>{crumb.label}</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Breadcrumb.Item>
			{/if}
			{#each shownCrumbs as crumb}
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>
