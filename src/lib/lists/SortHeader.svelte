<script lang="ts">
	import type { ListResult } from './shared';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	type P = {
		list: ListResult<Record<string, unknown>>;
		key: string;
		children: Snippet;
	};

	let { list, key, children }: P = $props();
	let href = $derived.by(() => {
		const url = new URL($page.url);
		url.searchParams.set('sort', key);
		if (list.sort === key) {
			url.searchParams.set('dir', list.dir === 'asc' ? 'desc' : 'asc');
		}
		return url.href;
	});
	let active = $derived(list.sort === key);
</script>

<a data-sveltekit-noscroll class="flex gap-x-1" {href}>
	<div class="underline">{@render children()}</div>
	<div>
		{#if active}
			{#if list.dir === 'asc'}
				↓
			{:else}
				↑
			{/if}
		{/if}
	</div>
</a>
