import { Calendar, Home, Users, Shield, Trophy, ScrollText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Members",
    url: "/admin/members",
    icon: Users,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: Shield,
  },
  {
    title: "Achievements",
    url: "/admin/achievements",
    icon: Trophy,
  },
  {
    title: "Logs",
    url: "/admin/logs",
    icon: ScrollText,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent className="shadow-xl">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}