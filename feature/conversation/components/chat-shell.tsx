"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./app-sidebar"


export default function ChatShell({children}:{children:React.ReactNode}){
    return(
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset className="wisp-chat-inset overflow-hidden h-svh min-h-0 md:h-[calc(100svh-1rem)]">
                {children}
            </SidebarInset>
            
        </SidebarProvider>
    )
}
