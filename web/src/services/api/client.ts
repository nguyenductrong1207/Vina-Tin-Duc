/**
 * Centralized API client for Strapi REST API.
 * Handles base URL, headers, error normalization, and query building.
 */

import { env } from '@/app/config/env';

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown,
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  params?: Record<string, string | number | boolean | string[] | undefined>;
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | string[] | undefined>): string {
  const url = new URL(path, env.apiUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;

      // Handle array values (e.g., populate fields)
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          url.searchParams.set(`${key}[${i}]`, v);
        });
      } else {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function request<T>(path: string, options?: RequestOptions): Promise<T> {
  const url = buildUrl(path, options?.params);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      // Response might not be JSON
    }
    throw new ApiError(response.status, response.statusText, data);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>(path, options),
};
