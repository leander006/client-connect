import Form from '@/components/Form'
import Messages from '@/components/Messages'
import { auth } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Messaging() {
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
    <div className='pt-12 h-full'>
            <Messages/>
    </div>
  )
}

export default Messaging