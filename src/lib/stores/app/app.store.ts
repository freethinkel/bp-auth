import { writable } from 'svelte/store';

export const isOnline = writable(navigator.onLine);

window.addEventListener('offline', () => {
	isOnline.set(navigator.onLine);
});

window.addEventListener('online', () => {
	isOnline.set(navigator.onLine);
});
