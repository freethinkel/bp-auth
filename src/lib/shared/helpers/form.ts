import { writable, type Readable } from 'svelte/store';

export type FormOptions = {
	clearErrorsOnChange?: boolean;
};

export const createForm = <T extends Record<string, string | number>>(
	initialValues: T,
	options?: FormOptions
) => {
	const values = writable(initialValues);
	const errors = writable<Partial<Record<keyof T, string>>>({});

	return {
		values: values as Readable<T>,
		errors,
		clear: () => {
			writable(initialValues);
			errors.set({});
		},
		change:
			<K extends keyof T>(key: K) =>
			(value: T[K]) => {
				values.update((prevValue) => ({
					...prevValue,
					[key]: value
				}));

				if (options?.clearErrorsOnChange) {
					errors.set({});
				} else {
					errors.update((prevValue) => ({
						...prevValue,
						[key]: ''
					}));
				}
			}
	};
};
