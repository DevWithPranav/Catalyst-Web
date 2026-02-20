"use server"

import { cookies } from "next/headers"

export async function deleteAchievement(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get("admin_session")?.value ?? ""
        const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
        const res = await fetch(`${BASE}/api/v1/achievements/${id}`, {
            method: "DELETE",
            cache: "no-store",
            headers: { Cookie: `admin_session=${sessionCookie}` },
        })

        if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            return { success: false, error: data.error ?? data.message ?? "Failed to delete achievement" }
        }

        return { success: true }
    } catch (err: any) {
        return { success: false, error: err.message ?? "Unknown error" }
    }
}
