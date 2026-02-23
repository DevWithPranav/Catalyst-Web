/**
 * Returns the absolute base URL for server-side fetch calls.
 *
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL  – set this in Vercel env vars for production
 * 2. VERCEL_URL           – automatically injected by Vercel at build/runtime
 * 3. localhost:3000       – local development fallback
 */
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL
    }
    if (process.env.VERCEL_URL) {
        // VERCEL_URL is injected without protocol
        return `https://${process.env.VERCEL_URL}`
    }
    return "http://localhost:3000"
}
