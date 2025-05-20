import { HttpClient } from '@/shared/helpers/http-client';
import { mockFetch } from '@/shared/helpers/mock-fetch';

export const httpClient = new HttpClient(import.meta.env.VITE_API_URL, mockFetch);
