import ChatShell from "@/feature/conversation/components/chat-shell"
import { auth } from "@clerk/nextjs/server"
import React from "react"

const RootGrouplayout=async({children}:{children:React.ReactNode})=>{
  await auth.protect()

  return(
    <ChatShell>
      {children}
    </ChatShell>
  )
}

export default RootGrouplayout