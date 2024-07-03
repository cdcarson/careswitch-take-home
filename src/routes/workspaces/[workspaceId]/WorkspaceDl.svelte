<script lang="ts">
	import type { WorkspaceListItem } from '../shared';

	type P = {
		workspace: WorkspaceListItem;
	};

	let { workspace }: P = $props();
</script>

<dl>
	<dt class="text-xs font-medium">Workspace ID</dt>
	<dd class="mb-4 last:mb-0">{workspace.id}</dd>
	<dt class="text-xs font-medium">Name</dt>
	<dd class="mb-4 last:mb-0">{workspace.name}</dd>
	<dt class="text-xs font-medium">Description</dt>
	<dd class="mb-4 last:mb-0">
		{#if workspace.description}
			{workspace.description}
		{:else}
			<span class="text-muted-foreground">[not set]</span>
		{/if}
	</dd>
	<dt class="text-xs font-medium">Number of Users</dt>
	<dd class="mb-4 last:mb-0">{workspace._count.userPermissions}</dd>
</dl>
