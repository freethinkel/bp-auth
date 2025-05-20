import { vi } from 'vitest';

console.log(globalThis.navigator.onLine);

if (!('navigator' in globalThis)) {
	// @ts-expect-error mock
	globalThis.navigator = { onLine: true };
}

if (!('window' in globalThis)) {
	// @ts-expect-error mock
	globalThis.window = {
		addEventListener: vi.fn(),
		navigator: globalThis.navigator
	};
}
