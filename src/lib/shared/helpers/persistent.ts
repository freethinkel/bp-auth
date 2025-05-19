import { writable, type Writable } from 'svelte/store';

const fromStorage = (key: string) => {
	try {
		return JSON.parse(localStorage.get(key));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return null;
	}
};

const toStorage = <T>(key: string, value: T) => {
	try {
		localStorage.set(key, JSON.stringify(value));
	} catch (err) {
		console.error(err);
	}
};

export const createPersistentStore = <T>(key: string, initialValue: T): Writable<T> => {
	const value = fromStorage(key) ?? initialValue;
	const store = writable(value);

	return {
		set: (value: T) => {
			toStorage(key, value);
			store.set(value);
		},
		subscribe: store.subscribe,
		update: (fn: (v: T) => T) => {
			store.update((currentValue) => {
				const newValue = fn(currentValue);
				toStorage(key, newValue);
				return newValue;
			});
		}
	};
};
