import { sleep } from './sleep';

export const MOCK_USERS = [
	{ email: 'user1@example.com', password: '$trongp@ssword1', name: 'Bernhard and Sons' },
	{ email: 'user2@example.com', password: '$trongp@ssword2', name: 'Stroman Group' },
	{ email: 'user3@example.com', password: '$trongp@ssword3', name: 'Kutch - Treutel' },
	{ email: 'user4@example.com', password: '$trongp@ssword4', name: 'Pollich, Hermann and Bradtke' },
	{ email: 'user5@example.com', password: '$trongp@ssword5', name: 'Schoen Group' },
	{ email: 'user5@example.com', password: '$trongp@ssword6', name: 'Hansen and Sons' }
].map((user, i) => ({
	...user,
	id: i + 1
}));

/**
 * Types for mock response data
 */
type MockUserData = {
	name: string;
	email: string;
	id: number;
};

type MockAuthResponse = {
	user: MockUserData;
	token?: string;
	refreshToken?: string;
};

type MockErrorResponse = {
	error: string;
	status: number;
	message: string;
};

/**
 * Simulates network latency
 * @param {number} min - Minimum delay in milliseconds
 * @param {number} max - Maximum delay in milliseconds
 * @param {AbortSignal} [signal] - AbortSignal to cancel the delay
 * @returns {Promise<void>}
 * @throws {DOMException} - When aborted
 */
const simulateLatency = async (min = 300, max = 1500, signal?: AbortSignal): Promise<void> => {
	const latency = Math.floor(Math.random() * (max - min)) + min;
	await sleep(latency, signal);
};

/**
 * Creates a success response with the specified data and status
 * @param {unknown} data - The response data
 * @param {number} status - HTTP status code
 * @returns {Response} - Mocked Response object
 */
const createSuccessResponse = (data: unknown, status = 200): Response => {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/**
 * Creates an error response with the specified message and status
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {Response} - Mocked Response object
 */
const createErrorResponse = (message: string, status = 400): Response => {
	const errorResponse: MockErrorResponse = {
		error: status === 401 ? 'Unauthorized' : 'Bad Request',
		status,
		message
	};

	return new Response(JSON.stringify(errorResponse), {
		status,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/**
 * Mock response for successful login
 */
const mockLogin = async (body?: unknown, signal?: AbortSignal): Promise<Response> => {
	await simulateLatency(200, 3000, signal);

	if (body) {
		try {
			const credentials = JSON.parse(body as string);

			if (credentials.email === 'error@example.com') {
				return createErrorResponse('Invalid credentials', 401);
			}
		} catch {
			// Invalid JSON handling
		}
	}

	const credentials = JSON.parse(body as string);
	const foundUser = MOCK_USERS.find(
		(user) => user.email === credentials.email && user.password === credentials.password
	);

	if (!foundUser) {
		return createErrorResponse('Invalid credentials', 401);
	}

	const user = { ...foundUser };
	Reflect.deleteProperty(user, 'password');

	const authResponse: MockAuthResponse = {
		user: user,
		token: 'mock-jwt-token.signature'
	};

	return createSuccessResponse(authResponse);
};

/**
 * Overrides the global fetch function in a browser environment
 * to mock specific API calls
 */
export const mockFetch = async (
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> => {
	const url = input instanceof Request ? input.url : input.toString();
	const method = init?.method || (input instanceof Request ? input.method : 'GET');
	const body = init?.body || (input instanceof Request ? input.body : undefined);
	const signal = init?.signal || (input instanceof Request ? input.signal : undefined);

	try {
		// API endpoint matching
		if (url.endsWith('/api/login') && method === 'POST') {
			return await mockLogin(body, signal);
		}
	} catch (error) {
		// Handle abort errors
		if (error instanceof DOMException && error.name === 'AbortError') {
			console.warn('Mock fetch request aborted:', url);
			throw error; // Rethrow to match native fetch behavior
		}
		throw error; // Rethrow other errors
	}

	throw new Error(`Mock is not declared for the url: ${url}`);
};
