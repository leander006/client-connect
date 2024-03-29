import React from 'react'
import Chat from './Chat'
import Search from './Search'

function Chats() {
  return (
      <div className="pt-16 md:px-12  h-screen">
      
      <div className="h-[70%] pt-2">
          <Chat/>
      </div>
      <div className="h-[30%] flex items-center justify-center">
          <Search/>
      </div>
    </div>
  )
}

export default Chats