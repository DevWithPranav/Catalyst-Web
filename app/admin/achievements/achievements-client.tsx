"use client"

import * as React from "react"
import { Achievement, getColumns } from "./columns"
import { DataTable } from "./data-table"
import AddAchievementForm from "./add-achievement-form"
import { Organization } from "@/app/admin/members/types"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AchievementsClientProps {
    initialData: Achievement[]
    organizations: Organization[]
}

export function AchievementsClient({ initialData, organizations }: AchievementsClientProps) {
    const [data, setData] = React.useState<Achievement[]>(initialData)
    const [alert, setAlert] = React.useState<{
        type: "success" | "error"
        message: string
    } | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [editingAchievement, setEditingAchievement] = React.useState<Achievement | null>(null)

    const handleEditAchievement = React.useCallback((achievement: Achievement) => {
        setEditingAchievement(achievement)
        setIsDrawerOpen(true)
    }, [])

    const handleDeleteSuccess = React.useCallback((id: string) => {
        setData((prev) => prev.filter((a) => a.id !== id))
    }, [])

    const handleAddSuccess = React.useCallback(() => {
        setIsDrawerOpen(false)
        setAlert({ type: "success", message: "Achievement added successfully!" })
        setTimeout(() => window.location.reload(), 1200)
    }, [])

    const handleEditSuccess = React.useCallback(() => {
        setIsDrawerOpen(false)
        setEditingAchievement(null)
        setAlert({ type: "success", message: "Achievement updated successfully!" })
        setTimeout(() => window.location.reload(), 1200)
    }, [])

    // Track background POSTs (addMultiple mode)
    const pendingPostsRef = React.useRef<Set<Promise<void>>>(new Set())
    // True if at least one background POST was started this drawer session
    const hadBackgroundPostRef = React.useRef(false)

    const handleBackgroundPost = React.useCallback((promise: Promise<void>) => {
        hadBackgroundPostRef.current = true
        pendingPostsRef.current.add(promise)
        promise.finally(() => pendingPostsRef.current.delete(promise))
    }, [])

    const handleDrawerOpenChange = React.useCallback(async (open: boolean) => {
        if (open) {
            // Reset session flag when drawer opens
            hadBackgroundPostRef.current = false
            setIsDrawerOpen(true)
        } else {
            setIsDrawerOpen(false)
            setEditingAchievement(null)
            if (hadBackgroundPostRef.current) {
                // Wait for any still-in-flight POSTs then reload
                const pending = [...pendingPostsRef.current]
                if (pending.length > 0) await Promise.allSettled(pending)
                window.location.reload()
            }
        }
    }, [])

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
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

            <div className="flex justify-between items-center w-full">
                <div>
                    <h1>Achievements</h1>
                </div>
                <div>
                    <Drawer direction="right" open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
                        <DrawerTrigger asChild>
                            <Button variant="outline"><Plus />Add Achievement</Button>
                        </DrawerTrigger>
                        <DrawerContent className="no-scrollbar overflow-y-auto overflow-x-hidden">
                            <AddAchievementForm
                                organizations={organizations}
                                onSubmitSuccess={editingAchievement ? handleEditSuccess : handleAddSuccess}
                                onBackgroundPost={editingAchievement ? undefined : handleBackgroundPost}
                                initialData={editingAchievement ?? undefined}
                                achievementId={editingAchievement?.id}
                            />
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

            <div className="py-10 w-full">
                <DataTable
                    columns={getColumns(handleEditAchievement, handleDeleteSuccess)}
                    data={data}
                />
            </div>
        </div>
    )
}
