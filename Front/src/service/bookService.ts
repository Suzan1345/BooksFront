import type { Book } from '@/types/Book'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

type SearchParams = {
  q?: string
  category?: string
}

// Helper: sichere Fetch-Funktion mit Fehlerbehandlung
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function getFeaturedBooks(category?: string): Promise<Book[]> {
  const q = new URLSearchParams()
  if (category) q.set('category', category)
  return http<Book[]>(`/books/featured${q.toString() ? `?${q}` : ''}`)
}

export async function searchBooks(params: SearchParams): Promise<Book[]> {
  const q = new URLSearchParams()
  if (params.q) q.set('q', params.q)
  if (params.category) q.set('category', params.category)
  return http<Book[]>(`/books/search?${q}`)
}

export async function getCategories(): Promise<string[]> {
  return http<string[]>(`/books/categories`)
}
