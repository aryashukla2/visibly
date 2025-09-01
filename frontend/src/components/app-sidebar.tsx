"use client";

import * as React from "react";
import { Home, FileChartLine, Settings, BarChart3} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileChartLine,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// This is sample data for user
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onCollapseChange?: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="mt-0">
        <SidebarHeader className="text-black font-intra mt-4 ml-1 font-bold py-6">
          <Link href="/" className="w-full flex items-center justify-start hover:text-sky-600 transition-colors cursor-pointer">
            {isCollapsed ? (
              <BarChart3 className="h-9 w-9 flex-shrink-0" />
            ) : (
              <>
                <BarChart3 className="h-9 w-9 flex-shrink-0 mr-3" />
                <span className="text-3xl">Visibly</span>
              </>
            )}
          </Link>
          {!isCollapsed && <div className="border-b border-gray-300 mt-4"></div>}
        </SidebarHeader>
        <SidebarGroup className="mt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-lg py-3 px-4 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "font-bold text-sky-600 bg-sky-50 hover:text-sky-600 hover:bg-sky-100"
                          : "text-gray-700 hover:bg-sky-600 hover:text-white font-medium"
                      }`}
                    >
                      <Link href={item.url} className="w-full flex items-center">
                        <item.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}