import { Calendar, Home, Settings, Users, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Početna",
    url: "/admin/dashboard",
    icon: Home,
  },

  {
    title: "Kalendar",
    url: "/admin/kalendar",
    icon: Calendar,
  },
  {
    title: "Korisnici",
    url: "/admin/korisnici",
    icon: Users,
  },
  {
    title: "Postavke",
    url: "/admin/postavke",
    icon: Settings,
  },
  {
    title: "Odjavite se",
    url: null,
    icon: LogOut,
  },
];

export function AppSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5">
            Insignia admin panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Odjavite se" ? (
                      <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 text-left"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a href={item.url!}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
