export type RequestOptions = {
	signal?: AbortSignal;
	queryParams?: Record<string, string>;
};

export type HttpResponse<T> = {
	status: number;
	ok: boolean;
	data: T;
};

export class HttpClient {
	constructor(
		private baseUrl: string,
		private fetch: (
			input: string | URL | globalThis.Request,
			init?: RequestInit
		) => Promise<Response>
	) {}

	private _buildUrl(path: string, queryParams?: Record<string, string>): URL {
		const url = new URL(path, this.baseUrl);
		if (queryParams) {
			for (const [key, value] of Object.entries(queryParams)) {
				url.searchParams.append(key, value);
			}
		}
		return url;
	}

	private async _buildResponse<T>(response: Promise<Response>): Promise<HttpResponse<T>> {
		try {
			const res = await response;

			const text = await res.text();
			let data: T;
			try {
				data = JSON.parse(text);
			} catch (err) {
				data = text as T;
				console.error(err);
			}

			return {
				status: res.status,
				ok: res.ok,
				data
			};
		} catch (err) {
			console.error(err);

			throw {
				status: 0,
				data: err,
				ok: false
			};
		}
	}

	get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this._buildResponse(
			this.fetch(this._buildUrl(url, options?.queryParams), {
				method: 'GET',
				signal: options?.signal
			})
		);
	}

	post<B, T>(url: string, body?: B, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this._buildResponse(
			this.fetch(this._buildUrl(url), {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				},
				signal: options?.signal
			})
		);
	}
}
