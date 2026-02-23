import { cookies } from "next/headers"
import { columns, Payment } from "./columns"
import { MembersClient } from "./members-client"
import { Role, Organization } from "./types"
import { getBaseUrl } from "@/lib/get-base-url"

const BASE = getBaseUrl()

async function getSessionCookieHeader(): Promise<{ Cookie: string }> {
    const cookieStore = await cookies()
    const value = cookieStore.get("admin_session")?.value ?? ""
    return { Cookie: `admin_session=${value}` }
}

async function getData(): Promise<Payment[]> {
    const res = await fetch(`${BASE}/api/v1/members`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })

    if (!res.ok) {
        throw new Error("Failed to fetch members")
    }

    const rawData = await res.json()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = Array.isArray(rawData) ? rawData : rawData.documents || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payments: Payment[] = list.map((item: any) => {
        const temp_join_date = item.join_date
        const join_Date_ = new Intl.DateTimeFormat("en-CA").format(
            new Date(temp_join_date)
        )
        const temp_leave_date = item.leave_date
        const leave_Date_ = new Intl.DateTimeFormat("en-CA").format(
            new Date(temp_leave_date)
        )

        return {
            id: item.$id,  // Add the ID from the API
            name: item.name,
            phone: item.phone,
            photo: item.photo,
            email: item.email,
            organization: item.orgs.map((orgs: any) => orgs.name).join(","),
            roles: item.roles.map((roles: any) => roles.name).join(","),
            join_date: join_Date_,
            leave_date: leave_Date_,
        }
    })

    return payments
}

export async function getRoles(): Promise<Role[]> {
    const res = await fetch(`${BASE}/api/v1/roles`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })

    if (!res.ok) {
        throw new Error("Failed to fetch roles")
    }

    const rawData = await res.json()
    const data = Array.isArray(rawData) ? rawData : rawData.documents || [];
    return data
}

export async function getOrganizations(): Promise<Organization[]> {
    const res = await fetch(`${BASE}/api/v1/org`, {
        method: "GET",
        cache: "no-store",
        headers: await getSessionCookieHeader(),
    })

    if (!res.ok) {
        throw new Error("Failed to fetch organizations")
    }

    const rawData = await res.json()
    const data = Array.isArray(rawData) ? rawData : rawData.documents || [];
    return data
}

export default async function DemoPage() {
    const data = await getData()
    const roles = await getRoles()
    const organizations = await getOrganizations()

    return (
        <MembersClient
            initialData={data}
            roles={roles}
            organizations={organizations}
        />
    )
}