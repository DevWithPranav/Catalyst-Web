/**
 * Centralized fetcher for admin server components (loopback to /api/v1).
 *
 * Uses `cache: "no-store"` so list data is not shared via the Next.js Data Cache
 * (fixes intermittent empty tables on Vercel). Optional `tags` / `revalidate` on
 * {@link adminFetch} are accepted for call-site compatibility; route handlers
 * should continue using `revalidateTag` after mutations.
 */

import { headers } from "next/headers"
import { getBaseUrlFromRequestHeaders } from "@/lib/get-base-url"

/** Loopback to Route Handlers: middleware allows `x-internal-token` without a session cookie. */
function getInternalApiHeaders(): Headers {
  const h = new Headers()
  h.set("x-internal-token", process.env.INTERNAL_API_KEY || "catalyst-internal-ssr")
  return h
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
  const sessionHeaders = getInternalApiHeaders()

  const headersList = await headers()

  // Match the incoming request host (custom domain / preview) and avoid http
  // defaults on Vercel, which can break loopback fetches.
  const BASE = getBaseUrlFromRequestHeaders(headersList)

  // Admin lists must not be stored in the Next.js Data Cache — shared or stale
  // entries on Vercel caused intermittent empty tables for some requests.
  void tags
  void revalidate

  // Forward the x-vercel-protection-bypass header if it is present
  const vercelBypass = headersList.get("x-vercel-protection-bypass")
  if (vercelBypass) {
    (sessionHeaders as Headers).set("x-vercel-protection-bypass", vercelBypass)
  }

  const fetchUrl = `${BASE}${path.startsWith("/") ? path : `/${path}`}`
  let res: Response;
  try {
    res = await fetch(fetchUrl, {
      method: "GET",
      headers: sessionHeaders,
      cache: "no-store",
    })
  } catch (err) {
    throw new Error(`[adminFetch] ${path} fetch failed entirely: ${err}`)
  }

  if (!res.ok) {
    let errBody = "";
    try { errBody = await res.text(); } catch(e) {}
    console.error(`[adminFetch] ${path} failed: ${res.status} ${res.statusText} - Body: ${errBody}`);
    throw new Error(`[adminFetch] ${path} failed: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}
