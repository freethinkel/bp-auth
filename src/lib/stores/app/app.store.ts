import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const isOnline = writable(browser ? navigator.onLine : false);

if (browser) {
	window.addEventListener('offline', () => {
		isOnline.set(navigator.onLine);
	});

	window.addEventListener('online', () => {
		isOnline.set(navigator.onLine);
	});
}
