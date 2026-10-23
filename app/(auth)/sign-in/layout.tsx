import React from 'react'
import Link from 'next/link'
import { WispMark } from '@/components/wisp-mark'

const AuthLayout = ({children}:{children:React.ReactNode})=>{
  return(
    <section className='auth-page min-h-svh flex flex-col justify-center items-center gap-8 px-5 py-12'>
      <Link href='/' className='wordmark'><WispMark /><span>wisp</span></Link>
      <div className='text-center'><p className='font-serif text-3xl tracking-tight'>A little space, just for you.</p><p className='mt-2 text-sm text-muted-foreground'>Sign in and let your next thought unfold.</p></div>
      {children}
      <Link href='/' className='text-xs text-muted-foreground hover:text-primary'>Back to Wisp</Link>
    </section>
  )
}

export default AuthLayout
