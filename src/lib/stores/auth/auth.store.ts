import { httpClient } from '@/application/config';
import { createForm } from '@/shared/helpers/form';
import { get, writable } from 'svelte/store';
import { showMessage } from '../snackbar';
import type { UserData } from '@/shared/types/user';
import { ERROR_MESSAGES } from '@/shared/contants/error-messages';
import { appStore } from '../app';
import { createPersistentStore } from '@/shared/helpers/persistent';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { HttpResponse } from '@/shared/helpers/http-client';

export const loading = writable(false);
export const authToken = createPersistentStore('auth_token', '');
export const authUserData = createPersistentStore<UserData | null>('auth_user_data', null);

export const {
	values: formValues,
	change: changeForm,
	handleSubmit,
	errors,
	reset
} = createForm(
	{
		email: '',
		password: ''
	},
	{
		validators: {
			email: (value) => (!/^\w+@\w+(\.\w+)?$/.test(value) ? ERROR_MESSAGES.invalidEmail : ''),
			password: (value) => (!value ? ERROR_MESSAGES.required : '')
		},
		onSubmit: (values) => onLogin(values),
		clearAllErrorsOnChange: true
	}
);

export const abortController = writable(new AbortController());

const onLogin = async ({ email, password }: { email: string; password: string }) => {
	try {
		if (!get(appStore.isOnline)) {
			showMessage({
				id: Math.random(),
				title: ERROR_MESSAGES.noInternet,
				kind: 'warning'
			});
			return;
		}

		errors.set({});
		loading.set(true);

		const res = await httpClient.post<
			{ email: string; password: string },
			{
				user: UserData;
				token: string;
			}
		>('/api/login', { email, password }, { signal: get(abortController).signal });

		authUserData.set(res.data.user);
		authToken.set(res.data.token);

		goto(`${base}/app`);
	} catch (err) {
		if (!(err instanceof HttpResponse)) {
			return;
		}

		if (err.ok) {
			return;
		}

		if (err.status === 401) {
			errors.set({ email: ERROR_MESSAGES.userNotFound, password: ERROR_MESSAGES.userNotFound });
			return;
		}

		showMessage({
			id: Math.random(),
			title: 'Something wrong, try again later',
			kind: 'error'
		});
	} finally {
		loading.set(false);
	}
};

export const logout = () => {
	authToken.set('');
	authUserData.set(null);
	goto(`${base}/login`, { replaceState: true });
};
