import { cookies } from "next/headers"
import { LogsClient } from "./logs-client"
import { ActionLog } from "./columns"

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

async function getSessionCookieHeader(): Promise<{ Cookie: string }> {
    const cookieStore = await cookies()
    const value = cookieStore.get("admin_session")?.value ?? ""
    return { Cookie: `admin_session=${value}` }
}

async function getLogs(): Promise<{ data: ActionLog[]; total: number }> {
    const res = await fetch(`${BASE}/api/v1/action-logs?limit=25&page=1`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })

    if (!res.ok) {
        return { data: [], total: 0 }
    }

    const json = await res.json()
    const list: ActionLog[] = (json.documents ?? []).map((doc: any) => ({
        id: doc.$id,
        action: doc.action,
        entity_type: doc.entity_type,
        entity_id: doc.entity_id,
        entity_name: doc.entity_name,
        performed_by: doc.performed_by,
        details: doc.details,
        status: doc.status,
        createdAt: doc.$createdAt,
    }))

    return { data: list, total: json.total ?? list.length }
}

export default async function LogsPage() {
    const { data, total } = await getLogs()

    return (
        <div className="py-10 px-4">
            <LogsClient initialData={data} total={total} />
        </div>
    )
}
