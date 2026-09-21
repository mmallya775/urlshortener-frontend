import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {NavLink, useLocation, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/auth/AuthContext.tsx";


const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/",
      items: [
        {
          title: "Home",
          url: "/",

        },
        {
          title: "Change Password",
          url: "/change-password",
        },
      ],
    },
  ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout(): Promise<void> {
    await logout();
    navigate("/signin", {replace: true});
  }

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-12 items-center px-2">
              <div className="flex items-center gap-2">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <div className="flex size-8 items-center justify-center rounded-md bg-black shadow-sm">
                    <img src="/favicon.svg" className="scale-75" alt="Smallify Icon"/>
                  </div>
                </div>
                <span className="font-medium">SmallifyURL</span>
              </div>
              <div className="ml-auto">
                <ModeToggle/>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="font-medium" disabled={true}>
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<NavLink to={subItem.url}/>}
                          isActive={location.pathname === subItem.url}
                        >
                          {subItem.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Button variant="destructive" className="mt-auto h-8 transition-all" onClick={() => void handleLogout()}>
          Logout
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}