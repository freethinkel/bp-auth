<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
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

<div class="page">
	<div class="container">
		<h1>404</h1>

		<a href="{base}/">Go home</a>
	</div>
</div>

<style>
	h1 {
		margin-top: 0;
	}
	.page {
		padding: var(--spacing-l) 0;
		height: inherit;
		min-height: inherit;
		background: var(--image);
		background: linear-gradient(
			180deg,
			var(--color-background),
			oklch(from var(--color-background) l c h / 30%) 60%,
			transparent
		);
	}
</style>
