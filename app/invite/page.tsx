import Form from '@/components/Form'
import Invite from '@/components/Invite'
import { auth } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {

      const session = await getServerSession(auth)

      if(!session){
        return(
                <div className="h-screen">
                  <div className="flex justify-center items-center h-full">
                      <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                          <div className="flex flex-col w-full p-5">
                            <Form/>
                          </div>
                      </div>
                  </div>
                </div>
        )
      }

  return (
      <div className="h-screen">
            <Invite/>
      </div>
  )
}

export default page