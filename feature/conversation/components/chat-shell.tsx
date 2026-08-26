"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./app-sidebar"


export default function ChatShell({children}:{children:React.ReactNode}){
    return(
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset className="overflow-hidden min-h-svh">
                {children}
            </SidebarInset>
            
        </SidebarProvider>
    )
}