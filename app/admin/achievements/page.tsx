import { Achievement } from "./columns"
import { AchievementsClient } from "./achievements-client"
import { Organization } from "@/app/admin/members/types"

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

async function getData(): Promise<Achievement[]> {
    const res = await fetch(`${BASE}/api/v1/achievements`, {
        method: "GET",
        cache: "no-store",
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
    })
    if (!res.ok) throw new Error("Failed to fetch organizations")

    const rawData = await res.json()
    return Array.isArray(rawData) ? rawData : rawData.documents ?? []
}

export default async function AchievementsPage() {
    const [data, organizations] = await Promise.all([getData(), getOrganizations()])
    return <AchievementsClient initialData={data} organizations={organizations} />
}
