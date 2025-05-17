import { HttpClient } from '@/shared/helpers/http-client';
import { mockFetch } from '@/shared/helpers/mock-fetch';
import { get } from 'svelte/store';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import * as authStore from './auth.store';
import { ERROR_MESSAGES } from '@/shared/contants/error-messages';
import { showMessage } from '../snackbar';
import { appStore } from '../app';

vi.mock('@/application/config', () => {
	return { httpClient: new HttpClient('http://localhost:3000', mockFetch) };
});

vi.mock('../snackbar', () => {
	return { showMessage: vi.fn() };
});

beforeAll(() => {
	vi.stubGlobal('navigagor', {
		onLine: true
	});
});

describe('Auth store', () => {
	beforeEach(() => {
		authStore.loading.set(false);

		authStore.changeForm('email')('');
		authStore.changeForm('password')('');

		appStore.isOnline.set(true);
	});

	it('Check if there is no internet connection', async () => {
		appStore.isOnline.set(false);

		authStore.changeForm('email')('user2@example.com');
		authStore.changeForm('password')('$trongp@ssword1');

		const promise = authStore.onLogin();
		expect(get(authStore.loading)).toBe(false);
		await promise;

		expect(showMessage).toBeCalledWith(
			expect.objectContaining({
				title: ERROR_MESSAGES.noInternet,
				kind: 'warning'
			})
		);
	});

	it('Check if the user not exists', async () => {
		authStore.changeForm('email')('notExisted@example.com');
		authStore.changeForm('password')('random_password');

		const promise = authStore.onLogin();
		expect(get(authStore.loading)).toBe(true);
		await promise;

		expect(get(authStore.loading)).toBe(false);
		expect(get(authStore.errors)).toStrictEqual({
			email: ERROR_MESSAGES.userNotFound,
			password: ERROR_MESSAGES.userNotFound
		});
	});

	it('Check if email and password are correct', async () => {
		authStore.changeForm('email')('user1@example.com');
		authStore.changeForm('password')('$trongp@ssword1');

		const promise = authStore.onLogin();
		expect(get(authStore.loading)).toBe(true);
		await promise;

		expect(get(authStore.loading)).toBe(false);
		expect(get(authStore.errors)).toStrictEqual({});
		expect(get(authStore.authToken)).toBe('mock-jwt-token.signature');
		expect(get(authStore.authUserData)).toStrictEqual({
			id: 1,
			email: 'user1@example.com',
			name: 'Bernhard and Sons'
		});
	});

	it('Check the loading is not stucked', async () => {
		const promise = authStore.onLogin();
		expect(get(authStore.loading)).toBe(false);
		await promise;
		expect(get(authStore.loading)).toBe(false);
	});
});
