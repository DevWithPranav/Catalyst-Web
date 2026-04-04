/**
 * Centralized, cache-aware data fetcher for all admin server components.
 *
 * Strategy:
 *  - Roles & Organizations are relatively static → revalidate every 5 minutes
 *  - Members, Events, Achievements → revalidate every 60 seconds
 *  - Action Logs (write-heavy, time-sensitive) → no-store (always fresh)
 */

import { cookies, headers } from "next/headers"

// ─── Auth helper ───────────────────────────────────────────────────────────────
export async function getSessionHeaders(): Promise<Headers> {
  const cookieStore = await cookies()
  // Forward all cookies (important for Vercel deployment protection)
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')
  
  const headers = new Headers();
  if (allCookies) {
    headers.set("Cookie", allCookies);
  }
  
  const token = process.env.INTERNAL_API_KEY || "catalyst-internal-ssr";
  headers.set("x-internal-token", token);
  
  // Custom header to distinguish internal fetch from middleware
  headers.set("x-admin-fetch", "true");

  return headers;
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

  // Forward the x-vercel-protection-bypass header if it is present
  const vercelBypass = headersList.get("x-vercel-protection-bypass")
  if (vercelBypass) {
    (sessionHeaders as Headers).set("x-vercel-protection-bypass", vercelBypass)
  }

  const fetchUrl = `${BASE}${path}`
  let res: Response;
  try {
    res = await fetch(fetchUrl, {
      method: "GET",
      headers: sessionHeaders,
      next: nextOptions,
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
