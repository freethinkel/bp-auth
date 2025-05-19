<script lang="ts">
	import { authStore } from '@/stores/auth';

	const userData = authStore.authUserData;
</script>

<div class="container">
	<h1>Hello {$userData?.name}</h1>
</div>
