"use client"

import * as React from "react"
import { ActionLog } from "./columns"
import { DataTable } from "./data-table"
import { ScrollText, RefreshCw, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LogsClientProps {
    initialData: ActionLog[]
    total: number
}

export function LogsClient({ initialData, total }: LogsClientProps) {
    const [data, setData] = React.useState<ActionLog[]>(initialData)
    const [totalCount, setTotalCount] = React.useState(total)
    const [page, setPage] = React.useState(1)
    const [statusFilter, setStatusFilter] = React.useState<"all" | "success" | "error">("all")
    const [entityFilter, setEntityFilter] = React.useState<string>("all")
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const limit = 25

    // Derive unique entity types from data for the filter dropdown
    const entityTypes = React.useMemo(() => {
        const all = initialData.map(l => l.entity_type)
        return Array.from(new Set(all)).sort()
    }, [initialData])

    const fetchLogs = React.useCallback(async (
        p: number,
        status: "all" | "success" | "error",
        entity: string
    ) => {
        setIsRefreshing(true)
        try {
            const params = new URLSearchParams({
                page: String(p),
                limit: String(limit),
            })
            if (status !== "all") params.set("status", status)
            if (entity !== "all") params.set("entity_type", entity)

            const res = await fetch(`/api/v1/action-logs?${params}`, {
                credentials: "include",
                cache: "no-store",
            })
            if (!res.ok) return

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
            setData(list)
            setTotalCount(json.total ?? list.length)
        } finally {
            setIsRefreshing(false)
        }
    }, [])

    // Refetch whenever filter/page changes
    React.useEffect(() => {
        fetchLogs(page, statusFilter, entityFilter)
    }, [page, statusFilter, entityFilter, fetchLogs])

    const totalPages = Math.max(1, Math.ceil(totalCount / limit))

    const successCount = data.filter(l => l.status === "success").length
    const errorCount = data.filter(l => l.status === "error").length

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto gap-6">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-muted-foreground" />
                    <h1 className="text-xl font-semibold">Action Logs</h1>
                    <span className="text-sm text-muted-foreground ml-1">
                        ({totalCount} total)
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchLogs(page, statusFilter, entityFilter)}
                    disabled={isRefreshing}
                    className="gap-1.5"
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                <div className="rounded-lg border bg-card px-4 py-3 flex items-center gap-3">
                    <div className="rounded-full bg-muted p-1.5">
                        <ScrollText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Total (page)</p>
                        <p className="text-lg font-semibold">{data.length}</p>
                    </div>
                </div>
                <div className="rounded-lg border bg-card px-4 py-3 flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/30">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Success</p>
                        <p className="text-lg font-semibold text-green-700 dark:text-green-400">{successCount}</p>
                    </div>
                </div>
                <div className="rounded-lg border bg-card px-4 py-3 flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900/30">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Errors</p>
                        <p className="text-lg font-semibold text-red-700 dark:text-red-400">{errorCount}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full flex-wrap">
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as "all" | "success" | "error")
                        setPage(1)
                    }}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-36"
                >
                    <option value="all">All statuses</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                </select>

                <select
                    value={entityFilter}
                    onChange={(e) => {
                        setEntityFilter(e.target.value)
                        setPage(1)
                    }}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-40 capitalize"
                >
                    <option value="all">All entities</option>
                    {entityTypes.map(et => (
                        <option key={et} value={et} className="capitalize">{et}</option>
                    ))}
                </select>
            </div>


            {/* Table */}
            <div className="w-full">
                <DataTable data={data} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1 || isRefreshing}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages || isRefreshing}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
