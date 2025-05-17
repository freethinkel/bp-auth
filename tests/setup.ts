import { vi } from 'vitest';

// @ts-expect-error mock
globalThis.navigator = { onLine: true };

// @ts-expect-error mock
globalThis.window = {
	addEventListener: vi.fn(),
	navigator: globalThis.navigator
};
