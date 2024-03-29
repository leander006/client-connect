"use client"
import { useState } from "react"
import Message from "./Message"

function Messages() {

      const [messages, setMessages] = useState([
            {
                  id:1,
                  name:"demo1",
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  text:"hello",
            },
            {
                  id:2,
                  name:"demo2",
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  text:"hello"
            },
            {
                  id:1,
                  name:"demo1",
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  text:"hello"
            }
            ,            {
                  id:2,
                  name:"demo2",
                  image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg",
                  text:"hello"
            }
      ])
      const [chat, setChat] = useState({
            name:"leander",
            image:"https://res.cloudinary.com/dj-sanghvi-college/image/upload/v1697996657/noProfile_jjyqlm.jpg"
      })

  return (
      <div className=" bg-secondary md:mx-24 md:my-2">
            <div className="bg-primary flex p-3 space-x-2 items-center">
                  <img className=" rounded-full h-6 w-6" src={chat.image} alt={chat.name}/>
                  <h1 className="md:text-xl capitalize">{chat.name}</h1>
            </div>
            <div className="h-[80vh] md:h-[77vh] overflow-y-scroll">
            {messages.map((m) =>(
                        <Message key={m.id} name={m.name} id={m.id} image={m.image} text={m.text}/>
                  ))}
                              {messages.map((m) =>(
                        <Message key={m.id} name={m.name} id={m.id} image={m.image} text={m.text}/>
                  ))}
                              {messages.map((m) =>(
                        <Message key={m.id} name={m.name} id={m.id} image={m.image} text={m.text}/>
                  ))}
            </div>
            <div className="w-full">
                  <input type="text" className="w-full p-3 focus:outline-none text-primary" placeholder="Enter message" />
            </div>
      </div>
  )
}

export default Messages