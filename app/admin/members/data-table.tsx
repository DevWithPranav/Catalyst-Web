"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function DataTable<TData, TValue>({
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
    state: {
      rowSelection,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedCount = selectedRows.length

  const handleDeleteSelected = async () => {
    setIsDeleting(true)
    const { deleteMember } = await import("@/app/admin/members/delete-member")

    // Snapshot member data before deletion
    const memberSnapshots = selectedRows.map((row) => {
      const rowData = row.original as any
      return { id: rowData.id || rowData.$id, name: rowData.name, email: rowData.email, roles: rowData.roles }
    })

    // Delete all selected members
    const deletePromises = memberSnapshots.map((m) => deleteMember(m.id))

    try {
      const results = await Promise.all(deletePromises)
      const failedIndices = results.map((r, i) => (!r.success ? i : -1)).filter(i => i !== -1)
      const succeededSnapshots = memberSnapshots.filter((_, i) => results[i].success)
      const failedSnapshots = memberSnapshots.filter((_, i) => !results[i].success)

      // Single consolidated log entry
      const allSucceeded = failedIndices.length === 0
      const details = memberSnapshots
        .map((m, i) => `${results[i].success ? "✓" : "✗"} ${m.name} (${m.email})${m.roles ? ` — ${m.roles}` : ""}`)
        .join(" | ")

      postActionLog({
        action: "Deleted Members (Bulk)",
        entity_type: "member",
        entity_name: allSucceeded
          ? `Bulk deleted ${succeededSnapshots.length} member(s): ${succeededSnapshots.map(m => m.name).join(", ")}`
          : `Bulk delete: ${succeededSnapshots.length} succeeded, ${failedSnapshots.length} failed`,
        status: allSucceeded ? "success" : failedSnapshots.length === memberSnapshots.length ? "error" : "error",
        details,
      })

      if (failedSnapshots.length > 0) {
        setAlert({
          type: "error",
          message: `Failed to delete ${failedSnapshots.length} of ${selectedCount} member(s). Deleted: ${succeededSnapshots.map(m => m.name).join(", ")}`
        })
        setTimeout(() => { window.location.reload() }, 2000)
      } else {
        setAlert({
          type: "success",
          message: `Successfully deleted ${selectedCount} member(s): ${memberSnapshots.map(m => m.name).join(", ")}`
        })
        setTimeout(() => { window.location.reload() }, 1500)
      }

      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      console.error("Delete error:", error)
      postActionLog({
        action: "Deleted Members (Bulk)",
        entity_type: "member",
        entity_name: `Bulk delete failed for ${memberSnapshots.length} member(s)`,
        status: "error",
        details: `Members: ${memberSnapshots.map(m => m.name).join(", ")} | Error: ${error?.message ?? "Unexpected error"}`,
      })
      setAlert({
        type: "error",
        message: "An error occurred while deleting members"
      })
      setIsDeleting(false)
      setTimeout(() => setAlert(null), 5000)
    }
  }

  return (
    <div className="space-y-4">
      {alert && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md">
          <Alert
            variant={alert.type === "error" ? "destructive" : "default"}
            className={`shadow-lg ${alert.type === "success"
              ? "border-l-4 border-l-green-500"
              : "border-l-4"
              }`}
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
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} member(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCount} selected member(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteSelected}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}