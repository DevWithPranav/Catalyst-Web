"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { postActionLog } from "@/lib/utils/action-log"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { id: string; title?: string }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [alert, setAlert] = React.useState<{
        type: "success" | "error"
        message: string
    } | null>(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
    })

    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedCount = selectedRows.length

    const handleDeleteSelected = async () => {
        setIsDeleting(true)

        const results = await Promise.allSettled(
            selectedRows.map((row) =>
                fetch(`/api/v1/events/${row.original.id}`, {
                    method: "DELETE",
                    credentials: "include",
                })
            )
        )

        const succeeded = results.filter((r) => r.status === "fulfilled" && (r.value as Response).ok)
        const failed = results.filter((r) => r.status === "rejected" || !(r as PromiseFulfilledResult<Response>).value?.ok)

        // Single consolidated log entry
        const details = selectedRows
            .map((row, i) => {
                const ok = results[i].status === "fulfilled" && (results[i] as PromiseFulfilledResult<Response>).value.ok
                return `${ok ? "✓" : "✗"} ${row.original.title}`
            })
            .join(" | ")

        postActionLog({
            action: "Deleted Events (Bulk)",
            entity_type: "event",
            entity_name: failed.length === 0
                ? `Bulk deleted ${succeeded.length} event(s)`
                : `Bulk delete: ${succeeded.length} succeeded, ${failed.length} failed`,
            status: failed.length === 0 ? "success" : "error",
            details,
        })

        setIsDeleteDialogOpen(false)

        if (failed.length === 0) {
            setAlert({ type: "success", message: `Successfully deleted ${succeeded.length} event(s).` })
            setTimeout(() => window.location.reload(), 1500)
        } else if (succeeded.length === 0) {
            setAlert({ type: "error", message: `Failed to delete all ${failed.length} event(s). Please try again.` })
            setIsDeleting(false)
            setTimeout(() => setAlert(null), 5000)
        } else {
            setAlert({ type: "error", message: `Deleted ${succeeded.length} event(s), but ${failed.length} failed.` })
            setTimeout(() => window.location.reload(), 2000)
        }
    }

    return (
        <div className="space-y-4">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50 max-w-md">
                    <Alert
                        variant={alert.type === "error" ? "destructive" : "default"}
                        className={`shadow-lg ${alert.type === "success" ? "border-l-4 border-l-green-500" : "border-l-4"}`}
                    >
                        {alert.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                            <XCircle className="h-4 w-4" />
                        )}
                        <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {selectedCount > 0 && (
                <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
                    <span className="text-sm text-muted-foreground">
                        {selectedCount} row(s) selected
                    </span>
                    <button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected
                    </button>
                </div>
            )}

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No events found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedCount} event(s)?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete {selectedCount} selected event(s)? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
