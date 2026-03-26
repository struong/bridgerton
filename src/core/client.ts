/** Base URL for the Bridge API, auto-detected from API key prefix. */
const base = () =>
  (process.env.BRIDGE_API_KEY ?? '').startsWith('sk-test')
    ? 'https://api.sandbox.bridge.xyz/v0'
    : 'https://api.bridge.xyz/v0'

/** Returns the full URL for a Bridge API path. */
export const url = (path: string) => `${base()}${path}`

const headers = () => ({
  'Api-Key': process.env.BRIDGE_API_KEY ?? '',
  'Content-Type': 'application/json',
})

async function request(method: string, path: string, body?: Record<string, unknown>) {
  const h: Record<string, string> = headers()
  if (method === 'POST' || method === 'PUT')
    h['Idempotency-Key'] = crypto.randomUUID()

  const res = await fetch(url(path), {
    method,
    headers: h,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return res.json()
}

/** Thin fetch wrapper for the Bridge.xyz API. */
export const bridge = {
  /** GET a Bridge API endpoint, with optional query params. */
  get: (path: string, params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : ''
    return request('GET', path + qs)
  },
  /** POST to a Bridge API endpoint. */
  post: (path: string, body: Record<string, unknown>) => request('POST', path, body),
  /** PUT to a Bridge API endpoint. */
  put: (path: string, body: Record<string, unknown>) => request('PUT', path, body),
  /** DELETE a Bridge API endpoint. */
  delete: (path: string) => request('DELETE', path),
}
