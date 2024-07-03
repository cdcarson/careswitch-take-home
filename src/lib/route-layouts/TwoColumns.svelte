<script lang="ts">
	import type { Snippet } from 'svelte';

	type P = {
		children: Snippet;
		right?: Snippet;
	};
	let { children, right }: P = $props();
</script>

<div class="grid gap-x-8 sm:grid-cols-2 sm:gap-y-8">
	<div>
		{@render children()}
	</div>
	<div>
		{#if right}
			{@render right()}
		{/if}
	</div>
</div>
