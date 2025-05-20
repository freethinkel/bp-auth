import { vi } from 'vitest';

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
