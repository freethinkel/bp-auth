import { writable } from 'svelte/store';
import type { SnackbarMessage } from './types';

const AUTO_HIDE_TIMEOUT = 5000;

export const messages = writable<SnackbarMessage[]>([]);

export const showMessage = (message: SnackbarMessage) => {
	messages.update((state) => [...state, message]);

	setTimeout(() => {
		messages.update((state) => state.filter(({ id }) => id !== message.id));
	}, AUTO_HIDE_TIMEOUT);
};
