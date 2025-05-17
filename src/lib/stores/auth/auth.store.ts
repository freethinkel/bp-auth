import { httpClient } from '@/application/config';
import { createForm } from '@/shared/helpers/form';
import { get, writable } from 'svelte/store';
import { showMessage } from '../snackbar';
import type { UserData } from '@/shared/types/user';
import { ERROR_MESSAGES } from '@/shared/contants/error-messages';
import { appStore } from '../app';

export const loading = writable(false);
export const authToken = writable('');
export const authUserData = writable<UserData | null>(null);

export const {
	values: formValues,
	change: changeForm,
	errors
} = createForm(
	{
		email: '',
		password: ''
	},
	{
		clearErrorsOnChange: true
	}
);

export const abortController = writable(new AbortController());

export const onLogin = async () => {
	console.log('START');
	try {
		const { email, password } = get(formValues);

		if (!email || !password) {
			return;
		}

		if (!get(appStore.isOnline)) {
			showMessage({
				id: Math.random(),
				title: ERROR_MESSAGES.noInternet,
				kind: 'warning'
			});
			return;
		}

		loading.set(true);

		const res = await httpClient.post<
			{ email: string; password: string },
			{
				user: UserData;
				token: string;
			}
		>('/api/login', { email, password });

		if (!res.ok) {
			if (res.status === 401) {
				errors.set({ email: ERROR_MESSAGES.userNotFound, password: ERROR_MESSAGES.userNotFound });
				return;
			}

			showMessage({
				id: Math.random(),
				title: 'Something wrong, try again later',
				kind: 'error'
			});
			return;
		}

		authUserData.set(res.data.user);
		authToken.set(res.data.token);

		console.log(res);
	} finally {
		loading.set(false);
	}
};
