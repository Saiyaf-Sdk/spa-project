import type { Product } from '@/types/product';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function request<T>(path: string, body?: unknown, shopper?: number): Promise<T> {
  const headers: Record<string, string> = { 'X-Lumen-Request': '1' };
  if (shopper !== undefined) headers['X-Lumen-Shopper'] = String(shopper);
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch('/api' + path, {
    method: body === undefined ? 'GET' : 'POST',
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null)
    throw new ApiError(
      response.status,
      data?.message || 'Cannot reach the store. Please try again.'
    );
  return data as T;
}

export const fetchProducts = () => request<Product[]>('/products');
export const fetchProductById = (id: number) => request<Product>('/products/' + id);
