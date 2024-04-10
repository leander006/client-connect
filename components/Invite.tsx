"use client"

import { useState } from "react"
import Input from "./Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { createClient } from "@/lib/actions/client"



function Invite() {
const [email, setEmail] = useState("")

const [loading, setLoading] = useState(false)
const router = useRouter()
const submit = async(e:any) =>{
    e.preventDefault()
        setLoading(true)
        const res:any = await createClient(email)
        setLoading(false)
        setEmail("")
        if(res.status == 401 || res.status == 502){
          return toast.error(res.message)
        }
        toast.success("Client invited successfully")
        router.push("/")
}


  return (
    <div className="flex justify-center items-center h-full">
      <div className={`flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center ${loading && "h-48" }`}>
                {!loading?<div className="flex flex-col w-full p-5">
                        <Input needed={true} type="email" name="Enter client's email" onChange={(e:any) => setEmail(e.target.value)} />
                        <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
                              <button onClick={submit} type="button" className="w-full">Invite</button>
                        </div>
                </div>:
                <div className="text-primary flex items-center">
                  <Spinner size={120}/>

                </div>
                }
        </div>
      </div>
  )
}

export default Invite