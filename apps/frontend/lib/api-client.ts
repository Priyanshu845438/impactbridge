import { fetcher } from './fetcher';

export interface ApiClientConfig {
  token?: string | null;
}

const clientConfig: ApiClientConfig = { token: null };

export function setApiClientToken(token: string | null) {
  clientConfig.token = token;
}

async function request<TResponse, TBody extends object | undefined = undefined>(
  path: string,
  method: string,
  body?: TBody,
  headers?: HeadersInit,
) {
  return fetcher<TResponse, TBody>({
    path,
    method,
    body,
    headers: {
      ...(clientConfig.token ? { Authorization: `Bearer ${clientConfig.token}` } : {}),
      ...headers,
    },
  });
}

export const apiClient = {
  get: <T>(path: string, headers?: HeadersInit) => request<T>(path, 'GET', undefined, headers),
  post: <T, B extends object>(path: string, body: B, headers?: HeadersInit) => request<T, B>(path, 'POST', body, headers),
  patch: <T, B extends object>(path: string, body: B, headers?: HeadersInit) => request<T, B>(path, 'PATCH', body, headers),
  delete: <T>(path: string, headers?: HeadersInit) => request<T>(path, 'DELETE', undefined, headers),
};
