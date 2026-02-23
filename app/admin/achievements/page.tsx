import { cookies } from "next/headers"
import { Achievement } from "./columns"
import { AchievementsClient } from "./achievements-client"
import { Organization } from "@/app/admin/members/types"
import { getBaseUrl } from "@/lib/get-base-url"

const BASE = getBaseUrl()

async function getSessionCookieHeader(): Promise<{ Cookie: string }> {
    const cookieStore = await cookies()
    const value = cookieStore.get("admin_session")?.value ?? ""
    return { Cookie: `admin_session=${value}` }
}

async function getData(): Promise<Achievement[]> {
    const res = await fetch(`${BASE}/api/v1/achievements`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })
    if (!res.ok) throw new Error("Failed to fetch achievements")

    const rawData = await res.json()
    const list: any[] = Array.isArray(rawData) ? rawData : rawData.documents ?? []

    return list.map((item: any): Achievement => ({
        id: item.$id,
        title: item.title,
        subtitle: item.subtitle ?? null,
        cover_image: item.cover_image ?? null,
        related_image: item.related_image ?? null,
        is_featured: item.Is_featured ?? item.is_featured ?? false,
        date: item.date ?? null,
        last_updated: new Intl.DateTimeFormat("en-CA").format(new Date(item.$updatedAt)),
    }))
}

async function getOrganizations(): Promise<Organization[]> {
    const res = await fetch(`${BASE}/api/v1/org`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })
    if (!res.ok) throw new Error("Failed to fetch organizations")

    const rawData = await res.json()
    return Array.isArray(rawData) ? rawData : rawData.documents ?? []
}

export default async function AchievementsPage() {
    const [data, organizations] = await Promise.all([getData(), getOrganizations()])
    return <AchievementsClient initialData={data} organizations={organizations} />
}
