<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			document.body.classList.add('body_404');
		}
	});

	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('body_404');
		}
	});
</script>

<svelte:head>
	<title>Demo authorization - {page.status} {page.error?.message}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<h1>{page.status} {page.error?.message}</h1>
		<a href="{base}/">Go home</a>
	</div>
</div>

<style>
	.container {
		padding-top: 50px;
		padding-bottom: 50px;
	}

	.page {
		background: linear-gradient(
			180deg,
			var(--color-background),
			oklch(from var(--color-background) l c h / 30%) 60%,
			transparent
		);
	}
</style>
