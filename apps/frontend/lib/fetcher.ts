export type RequestOptions<TBody extends object | undefined = undefined> = {
  path: string;
  method?: RequestInit['method'];
  body?: TBody;
  headers?: HeadersInit;
};

export async function fetcher<TResponse, TBody extends object | undefined = undefined>(
  options: RequestOptions<TBody>,
): Promise<TResponse> {
  const { path, method = 'GET', body, headers } = options;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<TResponse>;
}
