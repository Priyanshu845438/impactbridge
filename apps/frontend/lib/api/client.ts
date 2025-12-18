export interface ApiRequestOptions<TBody = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: TBody;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export interface ApiResponse<TData = unknown> {
  status: number;
  ok: boolean;
  data: TData | null;
}

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

export function normalizeError(status: number, payload: unknown): ApiError {
  if (
    payload &&
    typeof payload === 'object' &&
    'message' in (payload as Record<string, unknown>) &&
    (payload as Record<string, unknown>).message
  ) {
    return {
      status,
      message: String((payload as Record<string, unknown>).message),
      details: payload,
    };
  }

  return {
    status,
    message: status >= 500 ? 'Server error' : 'Request failed',
    details: payload,
  };
}

export async function apiRequest<TResponse = unknown, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<ApiResponse<TResponse>> {
  const { method = 'GET', path, body, signal, headers } = options;

  const response = await fetch(path, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  let payload: unknown = null;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    payload = await response.json();
  } else if (response.status !== 204) {
    payload = await response.text();
    if (payload === '') {
      payload = null;
    }
  }

  if (!response.ok) {
    throw normalizeError(response.status, payload);
  }

  return {
    status: response.status,
    ok: true,
    data: (payload ?? null) as TResponse | null,
  };
}
