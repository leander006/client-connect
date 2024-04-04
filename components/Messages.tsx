"use client"
import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRecoilState} from "recoil";
import { UserAtom } from "@/store/atoms/user";
import { io } from "socket.io-client";
import Spinner from "./Spinner";
import ChatSkeleton from "./Skeleton/ChatSkeleton";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

let socket:any

function Messages() {

      const [messages, setMessages] = useState<any[]>([])
      const [message, setMessage] = useState<string>("")
      const { data: session, status } = useSession()
      const {conversationId} = useParams();
      const [loading, setLoading] = useState(false)

      const [data,setData] = useRecoilState(UserAtom)
      const router = useRouter()
      const port = process.env.SOCKET_URL

      const messagesEndRef = useRef<HTMLDivElement>(null);
      const Endpoint = `${port}/`;

      useEffect(() => {
            socket = io(Endpoint);
            socket?.emit('setup', session?.user);
            socket?.on("connected",(name:any) =>{console.log(`${name} connected`);
            })
            socket?.emit('join room', conversationId);
    
            return () => {
                socket?.disconnect();
                socket?.off("connected",(name:any) =>{console.log(`${name} connected`);
            })
            };
        }, [session,conversationId,Endpoint]);

        useEffect(() => {
            socket?.on("get_Message", (messageReceived:any) => {
                setMessages([...messages,messageReceived])
            });

            return () => {
                  socket?.off("get_Message", (messageReceived:any) => {
                        setMessages([...messages,messageReceived])
                  });
            }
        });
        

      

      useEffect(() => {
            const getMessages = async() =>{
                  try {
                        setLoading(true)
                        const res = await axios.get(`/api/chat/message?id=${conversationId}`)
                        setData({name:localStorage.getItem("name")||"",image:localStorage.getItem("image")||""})
                        setMessages(res.data);
                        setLoading(false)
                  } catch (error) {
                        console.log(error);
                        setLoading(false)
                  }
            } 
            getMessages()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [Endpoint,conversationId])

      const sendMessage = async() =>{
            try {
                  const {data} = await axios.post(`/api/chat/message?userId=${session?.user?.id}&id=${conversationId}`,{body:message})
                  socket?.emit("send_message",{messageRecieved:data,room:conversationId})
                  setMessages([...messages,data])
                  setMessage("")
            } catch (error) {
                 console.log(error);
            }
      }

      const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };
    
        useEffect(() => {
            scrollToBottom();
        }, [messages]);


      if(status == "loading"){
            return (
              <>
                <div className="flex h-full w-full justify-center items-center"><Spinner size={120}/></div>
              </>      
            ); 

          }
  return (
      <div className=" bg-secondary md:mx-36 md:my-2">

            {data ?<div className="bg-primary flex p-3 space-x-2 items-center">
                  <div onClick={() =>{router.push("/home")}} className=" cursor-pointer">
                        <FaArrowLeft color="#0042A3" size={24} />
                  </div>
                  {data && <Image width={12} height={12} className=" rounded-full h-6 w-6" src={data.image} alt={data.name}/>}
                  <h1 className="text-sm md:text-lg capitalize">{data.name}</h1>
            </div>:
            <ChatSkeleton/>
            }

            <div className="h-[80vh] md:h-[77vh] overflow-y-scroll md:px-6">
            {!loading ?messages.map((m:any) =>(
                  <Message key={m?.id} name={m?.sender?.name} id={m?.sender?.id} image={m?.sender?.image} text={m?.body}/>
            )):<div >
                  <div className="flex flex-col items-end">
                        <MessageSkeleton/>
                  </div>
                  <div className="flex flex-col items-start">
                        <MessageSkeleton/>
                  </div>
                  <div className="flex flex-col items-end">
                        <MessageSkeleton/>
                  </div>
                  <div className="flex flex-col items-start">
                        <MessageSkeleton/>
                  </div>
                  <div className="flex flex-col items-end">
                        <MessageSkeleton/>
                  </div>
            </div>}
            <div ref={messagesEndRef} />
            </div>
            <div className="w-full flex bg-white items-center cursor-pointer pr-2">
                  <input value={message} onChange={(e:any) => setMessage(e.target.value)} type="text" className="w-full p-3 focus:outline-none text-primary" placeholder="Enter message" />
                  <div onClick={sendMessage}>
                        <IoSend color="#00A4FF" size={24}/>
                  </div>
            </div>
      </div>
  )
}

export default Messages