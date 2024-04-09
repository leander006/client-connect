"use client"

import { useState } from "react"
import Input from "./Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import Spinner from "./Spinner";



function Invite() {
const [email, setEmail] = useState("")

const [loading, setLoading] = useState(false)
const router = useRouter()
const submit = async(e:any) =>{
    e.preventDefault()
    try {
        setLoading(true)
        await axios.post(`api/auth/client`,{email:email})
        router.push(`/`)
        toast.success("Client invited successfully")
        setLoading(false)
    } catch (error:any) {
      toast.error(error?.response?.data?error?.response?.data:"Something went worng")
      console.log(error);
      setLoading(false)
    }
}
  return (
    <div className="flex justify-center items-center h-full">
      <div className={`flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center ${loading && "h-48" }`}>
                {!loading?<div className="flex flex-col w-full p-5">
                        <Input type="email" name="Enter client's email" onChange={(e:any) => setEmail(e.target.value)} />
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