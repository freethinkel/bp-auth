import { get, writable, type Readable } from 'svelte/store';

export type FormOptions<T extends Record<string, string | number>> = {
	clearAllErrorsOnChange?: boolean;
	onSubmit: (values: T) => Promise<void>;
	validators?: {
		[key in keyof T]?: (value: T[key]) => string | Promise<string>;
	};
};

export const createForm = <T extends Record<string, string | number>>(
	initialValues: T,
	options: FormOptions<T>
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
		handleSubmit: async () => {
			try {
				const formValues = get(values);

				if (options.validators) {
					const currentErrors = await Promise.allSettled(
						Object.entries(formValues).map(
							([key, value]) =>
								[
									key,
									options.validators?.[key]?.(value as T[typeof key]) ?? Promise.resolve('')
								] as const
						)
					);

					const errorEntries = currentErrors
						.map((item) => {
							if (item.status === 'fulfilled') {
								return item.value;
							}
						})
						.filter(Boolean) as [keyof T, string][];

					const hasErrors = errorEntries.some(([, error]) => error);
					const newErrors = Object.fromEntries(errorEntries) as Record<keyof T, string>;

					if (hasErrors) {
						errors.set(newErrors);
						return;
					}
				}

				await options.onSubmit(formValues);
			} catch (err) {
				console.error(err);
			}
		},
		change:
			<K extends keyof T>(key: K) =>
			(value: T[K]) => {
				values.update((prevValue) => ({
					...prevValue,
					[key]: value
				}));

				if (options?.clearAllErrorsOnChange) {
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
