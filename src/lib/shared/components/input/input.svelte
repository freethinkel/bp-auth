<script lang="ts">
	import { transitionWithPrefersReducedMotion } from '../../helpers/transition';
	import { Icon } from '../icon';
	import type { FormEventHandler, FullAutoFill, HTMLInputTypeAttribute } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	interface Props {
		type: HTMLInputTypeAttribute;
		value: string;
		placeholder?: string;
		label?: string;
		onChange?: (value: string) => void;
		required?: boolean;
		autocomplete?: FullAutoFill;
		disabled?: boolean;
		error?: string;
	}

	const {
		type,
		value,
		onChange,
		label,
		error,
		placeholder,
		required,
		autocomplete,
		disabled
	}: Props = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		const target = event.target as HTMLInputElement;

		onChange?.(target?.value ?? '');
		target.value = value;
	};

	let isPasswordShown = $state(false);
</script>

<label>
	{#if label}
		<span class="label">
			{label}
		</span>
	{/if}
	<div class="input__group">
		<input
			type={type === 'password' && isPasswordShown ? 'text' : type}
			oninput={handleInput}
			{disabled}
			{value}
			{placeholder}
			{required}
			class="input"
			{autocomplete}
			aria-invalid={Boolean(error)}
			class:input__error={error}
			class:input__password={type === 'password'}
		/>
		{#if type === 'password'}
			<button
				type="button"
				class="toggle-password-visible"
				aria-label={isPasswordShown ? 'Hide password' : 'Show password'}
				aria-expanded={isPasswordShown}
				title={isPasswordShown ? 'Hide password' : 'Show password'}
				onclick={(event) => {
					isPasswordShown = !isPasswordShown;
					event.preventDefault();
				}}
				onpointerdowncapture={(event) => {
					event.stopPropagation();
				}}
			>
				<span class="visually-hidden">{isPasswordShown ? 'Hide password' : 'Show password'}</span>
				<Icon name={isPasswordShown ? 'eye-slash' : 'eye'} />
			</button>
		{/if}
	</div>
	{#if error}
		<span
			class="error"
			transition:transitionWithPrefersReducedMotion={{ fn: slide, duration: 200 }}
		>
			{error}
		</span>
	{/if}
</label>

<style lang="postcss">
	.input__group {
		display: flex;
		position: relative;
		width: 100%;
	}
	.input {
		appearance: none;
		height: 48px;
		border: 2px solid oklch(from var(--color-accent) l c h / 20%);
		padding: 0 var(--spacing-m);
		border-radius: var(--radius);
		background-color: var(--color-surface);
		outline: none;
		transition: 0.1s ease-in-out border-color;
		font-size: 1rem;
		caret-color: var(--color-accent);
		width: 100%;

		&:focus {
			border-color: var(--color-accent);
		}

		&__password {
			padding-right: calc(36px + var(--spacing-m));
		}
		&__error {
			border-color: var(--color-error);
			color: var(--color-error) !important;
		}

		@media (prefers-reduced-motion) {
			transition: none;
		}

		&:-webkit-autofill {
			font-size: inherit;
			line-height: inherit;
		}
	}
	label {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);
	}
	.label {
		font-weight: 700;
		color: var(--color-text);
		font-size: 0.8rem;
	}
	.error {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--color-error);
	}
	.toggle-password-visible {
		height: 32px;
		width: 32px;
		position: absolute;
		bottom: 24px;
		border-radius: var(--radius);
		right: var(--spacing-m);
		transform: translateY(50%);
		appearance: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: oklch(from var(--color-text) l c h / 10%);
		outline-offset: 2px;
		-webkit-tap-highlight-color: transparent;
		transition:
			0.1s transform,
			0.1s background-color;

		@media (prefers-reduced-motion) {
			transition: none;
		}

		&:hover {
			background-color: oklch(from var(--color-text) l c h / 15%);
		}

		&:active {
			background-color: oklch(from var(--color-text) l c h / 15%);
			transform: translateY(50%) scale(0.97);
		}
		&:focus-visible {
			outline: 2px solid var(--color-accent);
		}
	}
</style>
