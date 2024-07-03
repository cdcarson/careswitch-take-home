<script lang="ts">
	import type { UserListItem } from '../shared';
	type P = {
		user: UserListItem;
	};

	let { user }: P = $props();
</script>

<dl>
	<dt class="text-xs font-medium">User ID</dt>
	<dd class="mb-4 last:mb-0">{user.id}</dd>
	<dt class="text-xs font-medium">Name</dt>
	<dd class="mb-4 last:mb-0">{user.name}</dd>
	<dt class="text-xs font-medium">Email Address</dt>
	<dd class="mb-4 last:mb-0">{user.email}</dd>
	<dt class="text-xs font-medium">Workspaces</dt>
	<dd class="mb-4 last:mb-0">{user._count.workspacePermissions}</dd>
</dl>
