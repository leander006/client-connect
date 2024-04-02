"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface userType{
      image:string,
      id:Number,
      name:string
      setUsers:any
}

function Users({id,name,image,setUsers}:userType) {

  const {data} = useSession()
  const router = useRouter()

      
  return (
      <div onClick={() => {router.push(`/profile/${id}`); setUsers([])}} className="flex items-center rounded-md bg-secondary my-1 cursor-pointer space-x-2 p-3">
            <Image width={12} height={12} className=" w-8 h-8 rounded-full" src={image} alt={name}/>
            <h1 className=" capitalize md:text-xl">{name}</h1>
      </div>
  )
}

export default Users