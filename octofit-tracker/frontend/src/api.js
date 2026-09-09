const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  for (const key of ['data', 'items', 'results', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }
  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${component}`)
  return extractItems(await response.json())
}