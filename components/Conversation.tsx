"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface body{
      id:any
      name: string;
}


function Conversation({name,id}:body) {
    const router = useRouter()
    console.log("id in chat ",id);
    
    const { data: session, status } = useSession();
    
  return (
    <div onClick={() => router.push(`/user/${session?.user?.id}/${id?.userId}`)} className="bg-secondary text-white flex p-2 rounded-md items-center space-x-3 cursor-pointer">
            <img src={id?.user?.image} alt="logoicon" className="w-8 h-8 rounded-full"/>
            <h1 className="capitalize">{name}</h1>
    </div>
  )
}

export default Conversation