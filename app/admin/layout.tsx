import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="sticky top-0 z-10">
          <SidebarTrigger />
        </div>
        <main className="flex-1 p-12 w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
