"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ActionLog, getColumns } from "./columns"

interface DataTableProps {
    data: ActionLog[]
}

export function DataTable({ data }: DataTableProps) {
    const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set())

    const toggleRow = React.useCallback((id: string) => {
        setExpandedRows(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }, [])

    const columns = React.useMemo(
        () => getColumns(expandedRows, toggleRow),
        [expandedRows, toggleRow]
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const isExpanded = expandedRows.has(row.original.id)
                            const hasDetails = !!row.original.details
                            return (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        data-state={row.getIsSelected() && "selected"}
                                        className={isExpanded ? "border-b-0" : ""}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {/* Collapsible detail row */}
                                    {hasDetails && isExpanded && (
                                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                                            <TableCell
                                                colSpan={columns.length}
                                                className="py-3 px-6"
                                            >
                                                <div className="flex flex-col gap-1.5">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                        Details
                                                    </p>
                                                    <div className="text-sm text-foreground whitespace-pre-wrap break-words">
                                                        {row.original.details!
                                                            .split(" | ")
                                                            .map((part, i) => (
                                                                <span key={i} className="inline-block">
                                                                    {i > 0 && (
                                                                        <span className="mx-2 text-muted-foreground select-none">·</span>
                                                                    )}
                                                                    {part}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No logs found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
