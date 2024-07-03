<script lang="ts">
	import { uniqueId } from '$lib/unique-id';
	import type { Snippet } from 'svelte';

	type P = {
		id?: string;
		children: Snippet;
	};
	let { id = uniqueId(), children }: P = $props();
</script>

<section {id} class="mx-auto px-4 py-8 lg:max-w-screen-lg">
	{@render children()}
</section>
