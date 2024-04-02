import React from 'react'
import Chat from './Chat'
import axios from 'axios';
import { env } from 'process';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import SendInvite from './SendInvite';
import Search from './Search';


async function Chats() {

const session = await getServerSession(auth)

const {data} = await axios.get(`${env.BASE_URL}/api/chat/conversation?userId=${session?.user.id}`)


  return (
      <div className="pt-16 md:px-12 h-full">
        {/* <div className='flex mx-2 md:hidden'>
            <Search/>
        </div> */}
      <div className="h-[70%] pt-2">
          {data.length != 0 ? <Chat p={data}/>:<div className='flex justify-center h-full md:text-xl items-center'>No conversations</div>}

      </div>
      <div className="h-[30%] flex items-center justify-center">
          <SendInvite/>
      </div>
    </div>
  )
}

export default Chats