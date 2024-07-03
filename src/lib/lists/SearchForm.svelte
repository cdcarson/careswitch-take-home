<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
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

<form data-sveltekit-noscroll method="GET" class="space-y-2">
	<div class="flex gap-x-2">
		<Input name="search" placeholder={`Search ${labels.plural}`} value={list.search} />
		<Button type="submit">Search</Button>
	</div>
	{#if list.isSearch}
		<div class="text-sm">
			You searched for <strong>{list.search}</strong>.
			<a class="underline" href={clearSearchHref}>Clear search</a>
		</div>
	{/if}
</form>
