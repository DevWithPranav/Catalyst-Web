/**
 * Centralized, cache-aware data fetcher for all admin server components.
 *
 * Strategy:
 *  - Roles & Organizations are relatively static → revalidate every 5 minutes
 *  - Members, Events, Achievements → revalidate every 60 seconds
 *  - Action Logs (write-heavy, time-sensitive) → no-store (always fresh)
 */

import { cookies, headers } from "next/headers"
import { getBaseUrl } from "@/lib/get-base-url"

// ─── Auth helper ───────────────────────────────────────────────────────────────
export async function getSessionHeaders(): Promise<{ Cookie: string }> {
  const cookieStore = await cookies()
  const value = cookieStore.get("admin_session")?.value ?? ""
  return { Cookie: `admin_session=${value}` }
}

// ─── Cache tags (for on-demand revalidation via revalidateTag) ────────────────
export const CACHE_TAGS = {
  members: "admin-members",
  roles: "admin-roles",
  organizations: "admin-organizations",
  events: "admin-events",
  achievements: "admin-achievements",
  logs: "admin-logs",
} as const

// ─── Generic fetcher ──────────────────────────────────────────────────────────
export async function adminFetch<T>(
  path: string,
  options: {
    tags?: string[]
    revalidate?: number | false // false = no-store
  } = {}
): Promise<T> {
  const { tags = [], revalidate = 60 } = options
  const sessionHeaders = await getSessionHeaders()

  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "http"

  const BASE = process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || (host ? `${protocol}://${host}` : "http://localhost:3000")

  const nextOptions: RequestInit["next"] =
    revalidate === false
      ? { revalidate: 0 }
      : { revalidate, tags }

  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: sessionHeaders,
    next: nextOptions,
  })

  if (!res.ok) {
    throw new Error(`[adminFetch] ${path} failed: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}
