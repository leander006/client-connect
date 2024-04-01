import Form from '@/components/Form'
import Invite from '@/components/Invite'
import { auth } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {

      const session = await getServerSession(auth)

      if(!session){
        redirect("/login")
      }
      
  return (
      <div className="h-screen">
            <Invite/>
      </div>
  )
}

export default page