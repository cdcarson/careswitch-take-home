<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';

	const flash = getFlash(page);

	let { children } = $props();
</script>

{@render children()}

{#if $flash}
	<div class="fixed bottom-0 right-0 flex items-center gap-1 bg-blue-700 px-3 py-2 text-white">
		<div>{$flash.message}</div>
		<div>
			<Button variant="ghost" onclick={() => ($flash = undefined)}>Close</Button>
		</div>
	</div>
{/if}

<ModeWatcher />
