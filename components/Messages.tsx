"use client"
import { useEffect, useState } from "react"
import Message from "./Message"
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";

function Messages() {

      const [messages, setMessages] = useState([])
      const { data: session } = useSession();
      console.log("data in sesison i messages",session?.user?.id);
      
      useEffect(() => {
            const getMessages = async() =>{
                  try {
                        const res = await axios.get(`/api/chat/message?id=${session?.user?.id}`)
                        setMessages(res.data);
                  } catch (error) {
                        console.log(error);
                  }
            }  
            getMessages()
      }, [])
      
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
            </div>
            <div className="w-full flex bg-white items-center cursor-pointer pr-2">
                  <input type="text" className="w-full p-3 focus:outline-none text-primary" placeholder="Enter message" />
                  <div>
                        <IoSend color="#00A4FF" size={24}/>
                  </div>
            </div>
      </div>
  )
}

export default Messages