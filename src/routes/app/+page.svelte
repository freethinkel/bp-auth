<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '@/shared/components/button';
	import { authStore } from '@/stores/auth';
	import { onMount } from 'svelte';

	const userData = authStore.authUserData;
	const authToken = authStore.authToken;

	onMount(() => {
		if (!$authToken) {
			goto('/login', { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Demo authorization - App</title>
</svelte:head>

<div class="container">
	<h1>Hello {$userData?.name}</h1>
	<pre><code>{JSON.stringify($userData, null, 2)}</code></pre>
	<Button onClick={() => authStore.logout()}>Logout</Button>
</div>

<style>
	h1 {
		margin-top: 0;
	}
</style>
