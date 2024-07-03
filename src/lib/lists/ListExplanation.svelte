<script lang="ts">
	import type { ListLabels, ListResult } from './shared';
	import { page } from '$app/stores';
	type P = {
		list: ListResult<Record<string, unknown>>;
		labels: ListLabels;
	};
	let { list, labels }: P = $props();
	let clearSearchHref = $derived.by(() => {
		const url = new URL($page.url);
		url.searchParams.delete('search');
		return url.href;
	});
</script>

{#if list.isSearch}
	You searched for <strong>{list.search}</strong>. Found {list.recordCount}
	{list.recordCount === 1 ? labels.singular : labels.plural}.
	<a data-sveltekit-noscroll class="underline" href={clearSearchHref}>Clear search</a>
{:else}
	Total: {list.recordCount} {list.recordCount === 1 ? labels.singular : labels.plural}.
{/if}
