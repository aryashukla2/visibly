"use client";

import * as React from "react";
import { Home, FileChartLine, Settings } from "lucide-react";
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
    url: "#",
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="mt-0">
        <SidebarHeader className="text-black font-intra mt-2 ml-1 font-semibold text-3xl">
          <Link href="/" className="w-full">
            Visibly
          </Link>
          <div className="border-b border-gray-300 mt-2"></div>
        </SidebarHeader>
        <SidebarGroup>
          {/*}
          <SidebarGroupLabel className="text-base">
            Application
          </SidebarGroupLabel>*/}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-base ${
                        isActive
                          ? "bg-black text-white hover:bg-black hover:text-white"
                          : ""
                      }`}
                    >
                      <Link href={item.url} className="w-full">
                        <item.icon className="text-20px" />
                        <span className="text-20px">{item.title}</span>
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
