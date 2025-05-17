/**
 * Creates a promise that resolves after a specified delay.
 * The promise can be aborted using an AbortSignal.
 *
 * @param ms - The number of milliseconds to sleep
 * @param signal - Optional AbortSignal to abort the sleep
 * @returns A promise that resolves after the specified delay
 * @throws DOMException with name 'AbortError' if the signal aborts
 */
export const sleep = (ms: number, signal?: AbortSignal): Promise<void> => {
	// If signal is already aborted, reject immediately
	if (signal?.aborted) {
		return Promise.reject(new DOMException('Aborted', 'AbortError'));
	}

	return new Promise((resolve, reject) => {
		const timeout = setTimeout(resolve, ms);

		if (signal) {
			signal.addEventListener(
				'abort',
				() => {
					clearTimeout(timeout);
					reject(new DOMException('Aborted', 'AbortError'));
				},
				{ once: true }
			);
		}
	});
};
