<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		children: Snippet;
		onClick?: MouseEventHandler<HTMLButtonElement>;
		type?: 'submit' | 'button' | 'reset';
		disabled?: boolean;
	}

	const { children, type = 'button', onClick, disabled }: Props = $props();
</script>

<!-- onpointerdown with noop just to let fire css :active pseudoclass -->
<button {type} onclick={onClick} onpointerdown={() => null} {disabled}>
	{@render children()}
</button>

<style lang="postcss">
	button {
		--bg-color: var(--color-accent);
		color: var(--color-title);
		appearance: none;
		height: 48px;
		display: flex;
		align-items: center;
		gap: var(--spacing-s);
		justify-content: center;
		padding: 0 var(--spacing-m);
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		background-color: var(--bg-color);
		border-radius: var(--radius);
		border: none;
		transition:
			0.1s ease-out transform,
			0.1s ease-out background;
		outline-offset: 2px;
		-webkit-tap-highlight-color: transparent;
		user-select: none;

		@media (prefers-reduced-motion) {
			transition: none;
		}

		&:not(:disabled):hover {
			--bg-color: oklch(from var(--color-accent) calc(l - 0.08) c h);
		}
		&:not(:disabled):active {
			transform: translateY(5%);
		}

		&:focus-visible {
			outline: 2px solid var(--color-accent);
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
</style>
