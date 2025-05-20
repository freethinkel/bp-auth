<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '@/shared/components/button';
	import { Input } from '@/shared/components/input';
	import { Loader } from '@/shared/components/loader';
	import { ERROR_MESSAGES } from '@/shared/contants/error-messages';
	import { authStore } from '@/stores/auth';
	import { onDestroy, onMount } from 'svelte';
	import { derived } from 'svelte/store';

	const errors = authStore.errors;
	const loading = authStore.loading;
	const formValues = authStore.formValues;
	const authToken = authStore.authToken;
	const abortController = authStore.abortController;

	const isButtonDisabled = derived([errors], ([errors]) =>
		Object.values(errors).some((error) =>
			[ERROR_MESSAGES.invalidEmail, ERROR_MESSAGES.userNotFound, ERROR_MESSAGES.required].includes(
				error
			)
		)
	);

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		authStore.handleSubmit();
	};

	onMount(() => {
		$abortController = new AbortController();

		if ($authToken) {
			goto('/app', { replaceState: true });
		}
	});

	onDestroy(() => {
		$abortController.abort();
	});
</script>

<svelte:head>
	<title>Demo authorization - Login</title>
</svelte:head>

<main class="container">
	<form on:submit={handleSubmit} class="card">
		<Input
			type="email"
			value={$formValues.email}
			onChange={authStore.changeForm('email')}
			label="Email"
			placeholder="Enter email"
			autocomplete="mobile email"
			required
			disabled={$loading}
			error={$errors.email}
		/>

		<div class="password_group">
			<Input
				type="password"
				value={$formValues.password}
				label="Password"
				placeholder="Your password"
				onChange={authStore.changeForm('password')}
				autocomplete="current-password"
				disabled={$loading}
				error={$errors.password}
				required
			/>

			<a href="/forgot-password">Forgot password?</a>
		</div>
		<div class="form__footer">
			<Button type="submit" disabled={$loading || $isButtonDisabled}>
				{#if $loading}
					<Loader delay={300} animationDirection="horizontal" />
				{/if}
				Sign in
			</Button>
			<hr />
			<a href="/sign-up">Sign up</a>
		</div>
	</form>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: inherit;
	}
	form {
		max-width: 400px;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		padding: var(--spacing-l);
		border-radius: var(--radius);
		gap: var(--spacing-m);
		box-shadow: var(--shadow-1);
	}
	.password_group {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-m);

		& :global(label) {
			width: 100%;
		}
	}
	.form__footer {
		margin-top: var(--spacing-l);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: var(--spacing-m);

		& :global(button) {
			gap: 0;

			& :global(.loader) {
				margin-right: var(--spacing-s);
			}
		}
	}
	form :global(button) {
		width: 100%;
	}
</style>
