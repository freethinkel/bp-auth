<script lang="ts">
	import { Snackbar } from '@/shared/components/snackbar';
	import { transitionWithPrefersReducedMotion } from '@/shared/helpers/transition';
	import { messages } from '@/stores/snackbar';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

{@render children?.()}

<div class="snackbar__wrapper">
	{#each $messages as message (message.id)}
		<div
			class="snackbar__item"
			transition:transitionWithPrefersReducedMotion={{ duration: 200, fn: slide, axis: 'x' }}
		>
			<Snackbar {message} />
		</div>
	{/each}
</div>

<style>
	.snackbar__wrapper {
		position: fixed;
		bottom: 10px;
		right: 10px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: var(--spacing-m);
	}
	.snackbar__item {
		padding: var(--spacing-s);
		display: flex;
		justify-content: flex-end;
	}
</style>
