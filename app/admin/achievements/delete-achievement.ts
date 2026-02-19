"use server"

export async function deleteAchievement(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/v1/achievements/${id}`, {
            method: "DELETE",
            cache: "no-store",
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
