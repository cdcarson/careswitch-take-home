<script lang="ts">
	type P = {
		heading: string;
		badge?: number | string;
		subheading?: string;
	};
	let { heading, badge, subheading }: P = $props();
</script>

<header class="mx-auto border-b px-4 py-8 lg:max-w-screen-lg">
	<h1 class="flex items-start gap-x-2 text-6xl font-medium">
		{heading}
		{#if badge}
			<div
				class="flex items-center justify-center rounded-full bg-blue-700 px-2 py-1 text-sm font-normal leading-none text-white"
			>
				{badge}
			</div>
		{/if}
	</h1>
	{#if subheading}
		<p class="text-lg text-gray-600 dark:text-gray-400">{subheading}</p>
	{/if}
</header>
