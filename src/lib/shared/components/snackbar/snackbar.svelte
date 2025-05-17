<script lang="ts">
	import type { SnackbarMessage } from '@/stores/snackbar/types';
	import { Icon } from '../icon';

	interface Props {
		message: SnackbarMessage;
	}
	const { message }: Props = $props();
</script>

<div class="wrapper">
	<div class="icon icon__{message.kind}">
		<Icon size={26} name={message.kind} />
	</div>
	<div class="title">{message.title}</div>
</div>

<style>
	.wrapper {
		display: flex;
		padding: var(--spacing-m);
		background-color: oklch(from var(--color-title) l c h / 30%);
		backdrop-filter: blur(10px);
		border-radius: var(--radius);
		gap: var(--spacing-s);
		color: var(--color-title);
		align-items: center;
		min-width: 200px;
		max-width: 400px;
		width: max-content;

		@media screen and (prefers-color-scheme: light) {
			background-color: oklch(from var(--color-title) l c h / 10%);
		}
	}

	.title {
		font-weight: 500;
		font-size: 1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.icon__error {
		& :global(.icon path) {
			fill: var(--color-error);
		}
	}
</style>
