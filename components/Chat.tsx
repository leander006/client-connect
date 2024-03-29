"use client"

import { useState } from "react"
import Conversation from "./Conversation"

function Chat() {
  
      const [chats, setChats] = useState([
            {
                  id:1,
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  name:"client1"
            },
            {
                  id:2,
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  name:"client2"
            },
            {
                  id:3,
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  name:"client3"
            }
      ])

  return (
    <div className="h-full space-y-2 overflow-y-scroll mx-2 ">
            {chats.map((c) =>(
                  <Conversation key={c.id} name={c.name} id={c.id} image={c.image}/>
            ))}
                        {chats.map((c) =>(
                  <Conversation key={c.id} name={c.name} id={c.id} image={c.image}/>
            ))}
                        {chats.map((c) =>(
                  <Conversation key={c.id} name={c.name} id={c.id} image={c.image}/>
            ))}

    </div>
  )
}

export default Chat