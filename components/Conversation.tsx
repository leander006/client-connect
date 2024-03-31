"use client"

import { UserAtom } from "@/store/atoms/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";


interface body{
      id:string,
      users:any
}


function Conversation({id,users}:body) {
    const router = useRouter()
    const [user,setUser] = useRecoilState(UserAtom)
    
    const {data} =  useSession()  
    const redirect = () =>{
        setUser({name:users?.user?.name,image:users?.user?.image})
        localStorage.setItem("name",users?.user?.name)
        localStorage.setItem("image",users?.user?.image)
        router.push(`/user/${data?.user?.id}/${id}`);
    }
  
    
  return (
    <div onClick={redirect} className="bg-secondary text-white flex p-2 rounded-md items-center space-x-3 cursor-pointer">
            <img src={users?.user?.image} alt="logoicon" className="w-8 h-8 rounded-full"/>
            <h1 className="capitalize">{users?.user?.name}</h1>
    </div>
  )
}

export default Conversation