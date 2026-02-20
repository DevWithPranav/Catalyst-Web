import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import "./globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Full Appwrite validation happens here in Node.js runtime
  const user = await getCurrentUser();

  if (!user) {
    // Session cookie exists (middleware passed us through) but Appwrite says invalid
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur px-4 py-2">
          <SidebarTrigger />

          {/* User + Sign out */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted-foreground">
              {user.name || user.email}
            </span>
            <form action="/api/v1/auth/logout" method="POST">
              <button
                id="admin-sign-out"
                type="submit"
                title="Sign out"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-12 w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
