import React from 'react'
import Chat from './Chat'
import axios from 'axios';
import { env } from 'process';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import SendInvite from './SendInvite';
import { getConversation } from '@/lib/actions/conversation';


async function Chats() {

const res = await getConversation()

  return (
      <div className="pt-16 md:px-12 h-full">
        {/* <div className='flex mx-2 md:hidden'>
            <Search/>
        </div> */}
      <div className="h-[70%] pt-2">
            {res.message.length != 0 ? <Chat p={res.message}/>:<div className='flex justify-center h-full md:text-xl items-center'>No conversations</div>}
      </div>
      <div className="h-[30%] flex items-center justify-center">
          <SendInvite/>
      </div>
    </div>
  )
}

export default Chats