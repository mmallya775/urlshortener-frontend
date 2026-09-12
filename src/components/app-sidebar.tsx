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
import {NavLink, useNavigate} from "react-router";
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

  async function handleLogout(): Promise<void> {
    await logout();
    navigate("/signin", {replace: true});
  }

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#"/>}>
              <div className="flex items-center gap-2">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <div className="flex size-8 items-center justify-center rounded-md bg-black shadow-sm">
                    <img src="/favicon.svg" className="scale-75" alt="Smallify Icon"/>
                  </div>
                </div>
                <span className="font-medium">SmallifyURL</span>
              </div>
              <div className="ml-auto flex items-center justify-center">
                <ModeToggle/>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<a href={item.url} className="font-medium"/>}
                >
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <NavLink to={item.url}>
                          {({isActive}) => (
                            <SidebarMenuSubButton isActive={isActive}>
                              {item.title}
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Button
          variant={"destructive"}
          className={"mt-auto h-8 transition-all"}
          onClick={() => void handleLogout()}
        >Logout</Button>
      </SidebarContent>
    </Sidebar>
  )
}
