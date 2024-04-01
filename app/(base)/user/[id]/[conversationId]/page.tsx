import Form from '@/components/Form'
import Messages from '@/components/Messages'
import { auth } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function Messaging() {
      const session = await getServerSession(auth)
      if(!session){
        redirect("/login")
      }
  return (
    <div className='pt-12 min min-h-full'>
            <Messages/>
    </div>
  )
}

export default Messaging