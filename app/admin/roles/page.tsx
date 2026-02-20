import { cookies } from "next/headers"
import { RolesClient } from "./roles-client"
import { Role } from "./types"

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

async function getRoles(): Promise<Role[]> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")?.value ?? ""
    const res = await fetch(`${BASE}/api/v1/roles`, {
        method: "GET",
        cache: "no-store",
        headers: { Cookie: `admin_session=${sessionCookie}` },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch roles")
    }

    const rawData = await res.json()
    const data = Array.isArray(rawData) ? rawData : rawData.documents || [];

    // Transform the API data to match our Role type
    const roles: Role[] = data.map((role: any) => ({
        id: role.$id,
        name: role.name,
        member_count: 0 // Set to 0 as requested
    }))

    return roles
}

export default async function RolesPage() {
    const roles = await getRoles()

    return <RolesClient initialData={roles} />
}
