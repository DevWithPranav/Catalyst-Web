import { cookies } from "next/headers"
import { EventsClient } from "./events-client"
import { Event } from "./columns"

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

async function getSessionCookieHeader(): Promise<{ Cookie: string }> {
    const cookieStore = await cookies()
    const value = cookieStore.get("admin_session")?.value ?? ""
    return { Cookie: `admin_session=${value}` }
}

async function getData(): Promise<Event[]> {
    const res = await fetch(`${BASE}/api/v1/events`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })
    if (!res.ok) throw new Error("Failed to fetch events")

    const rawData = await res.json()
    const list: any[] = Array.isArray(rawData) ? rawData : rawData.documents ?? []

    return list.map((item: any): Event => ({
        id: item.$id,
        title: item.title,
        subtitle: item.subtitle ?? null,
        cover_image: item.cover_image ?? null,
        start_date: item.start_date ?? null,
        end_date: item.end_date ?? null,
        status: item.status ?? null,
        register_link: item.register_link ?? null,
        is_featured: item.is_featured ?? item.Is_featured ?? false,
    }))
}

export default async function EventsPage() {
    const data = await getData()
    return <EventsClient initialData={data} />
}
