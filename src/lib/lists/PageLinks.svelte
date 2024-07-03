<script lang="ts">
	import type { ListResult } from './shared';
	import { page } from '$app/stores';
	type P = {
		list: ListResult<Record<string, unknown>>;
	};
	type Link = {
		href: string;
		disabled: boolean;
	};

	let { list }: P = $props();

	let first: Link = $derived.by(() => {
		const url = new URL($page.url);
		url.searchParams.delete('page');
		return {
			href: url.href,
			disabled: list.page === 1
		};
	});
	let prev: Link = $derived.by(() => {
		const url = new URL($page.url);

		const pageNum = list.page - 1;
		if (pageNum > 1) {
			url.searchParams.set('page', pageNum.toString());
		} else {
			url.searchParams.delete('page');
		}

		return {
			href: url.href,
			disabled: list.page === 1
		};
	});
	let next: Link = $derived.by(() => {
		const url = new URL($page.url);

		const pageNum = list.page + 1;
		url.searchParams.set('page', pageNum.toString());

		return {
			href: url.href,
			disabled: list.page === list.pageCount
		};
	});
	let last: Link = $derived.by(() => {
		const url = new URL($page.url);

		const pageNum = list.pageCount;
		url.searchParams.set('page', pageNum.toString());

		return {
			href: url.href,
			disabled: list.page === list.pageCount
		};
	});
</script>

<div class="flex items-center justify-between gap-2">
	<div class="flex gap-2">
		{@render pageLink(first, 'First')}
		{@render pageLink(prev, 'Prev')}
	</div>
	<div>
		Page {list.page} of {list.pageCount}
	</div>
	<div class="flex gap-2">
		{@render pageLink(next, 'Next')}
		{@render pageLink(last, 'Last')}
	</div>
</div>

{#snippet pageLink(link: Link, label: string)}
	<div>
		{#if !link.disabled}
			<a data-sveltekit-noscroll class="underline" href={link.href}>{label}</a>
		{:else}
			<span class="text-muted-foreground">{label}</span>
		{/if}
	</div>
{/snippet}
