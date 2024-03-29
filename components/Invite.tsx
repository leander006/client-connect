"use client"

import { useState } from "react"
import Input from "./Input"
import axios from "axios"
import { env } from "process"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


function Invite() {
const [email, setEmail] = useState("")
const [name, setName] = useState("")
const {data} = useSession()
const router = useRouter()
const submit = async(e:any) =>{
    e.preventDefault()
    try {
        await axios.post(`api/auth/client?name=${data?.user?.name}`,{email:email,userId:data?.user?.id,name:name})
        router.push(`/user/${data?.user?.id}`)
    } catch (error) {
      console.log(error);
    }
}
  return (
      <div className="flex justify-center items-center h-full">
            <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                <div className="flex flex-col w-full p-5">
                        <Input type="email" name="email" onChange={(e:any) => setEmail(e.target.value)} />
                        <Input type="text" name="name" onChange={(e:any) => setName(e.target.value)} />
                        <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
                              <button onClick={submit} type="button" className="w-full">Invite</button>
                        </div>
                </div>
            </div>
      </div>
  )
}

export default Invite