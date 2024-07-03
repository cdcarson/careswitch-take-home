<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ListLabels, ListResult } from './shared';
	import SearchForm from './SearchForm.svelte';
	import ListExplanation from './ListExplanation.svelte';
	import PageLinks from './PageLinks.svelte';

	type P = {
		list: ListResult<Record<string, unknown>>;
		labels: ListLabels;
		children: Snippet;
		buttons?: Snippet;
	};
	let { list, labels, children, buttons }: P = $props();
</script>

{#if list.unfilteredRecordCount > 0 || buttons}
	<div class="mb-8 grid gap-4 sm:grid-cols-2">
		<div>
			{#if buttons}
				{@render buttons()}
			{/if}
		</div>
		<div>
			{#if list.unfilteredRecordCount > 0}
				<SearchForm {list} {labels} />
			{/if}
		</div>
	</div>
{/if}
<div class="mb-8 grid gap-4 sm:grid-cols-2">
	<div>
		<ListExplanation {list} {labels} />
	</div>
	<div>
		{#if list.recordCount > 0}
			<PageLinks {list} />
		{/if}
	</div>
</div>
{#if list.recordCount > 0}
	<div class="w-full max-w-full overflow-x-scroll pb-4">
		{@render children()}
	</div>
{/if}
