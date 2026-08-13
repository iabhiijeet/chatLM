import { auth } from "@clerk/nextjs/server"
import React from "react"

const RootGrouplayout=async({children}:{children:React.ReactNode})=>{
  await auth.protect()

  return(
    <div>
      {children}
    </div>
  )
}

export default RootGrouplayout