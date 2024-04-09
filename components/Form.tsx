
"use client"

import { useState } from "react"
import Button from "./Button"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Input from "./Input";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { createFreelancer, getFreelancer } from "@/lib/actions/freelancer";


function Form() {
  
  const [email, setEmail] = useState("")  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [vis, setVis] = useState(true)
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  
  const submit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLoading(true)
    const res:any = await createFreelancer(email,username,password)          
    setLoading(false)
    if(res.status == 401 || res.status == 502){
      return toast.error(res.message)
    }
    toast.success(res.message)
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
          setLoading(true)
          const res:any = await getFreelancer(username,password)          
          await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,

          })
          setLoading(false)

          if(res.status == 401 || res.status == 502){
            return toast.error(res.message)
          }
          router.push(`/user/${res.message.id}`);
          toast.success("Login successfully")
  }
  return (
    <div>
      {loading ?
      <div className="h-[45vh] flex justify-center w-full items-center">
        <Spinner size={100}/>
      </div>:
      <div>
          <form onSubmit={!vis?submit:login}
      className="flex justify-center text-secondary flex-col item-center mt-4"
    >
      <h1 className="text-primary text-xl md:mb-3">{vis?"Login":"Sign up"}</h1>
      <div className="text-primary my-3">
        <h1>Username: leander06</h1>
        <h1>Password:12345</h1>
        </div>
        <Input name="Username" type="text" onChange={(e:any) => setUsername(e.target.value)}/>
        {!vis&& <Input name="Email" type="text" onChange={(e:any) => setEmail(e.target.value)}/>}
        <Input name="password" type="password" onChange={(e:any) => setPassword(e.target.value)}/>

      {vis?<Button name="Login"  type="submit" /> :
      <Button name="Sign up"  type="submit" />}
    </form>
      <div className="flex space-x-1 ">
          {!vis?<div className="w-full" onClick={() => setVis(true)}>
                <Button name="Login"  type="submit" />
          </div>:
          <div className="w-full" onClick={() => setVis(false)}>
                <Button name="Sign up" type="submit" />
          </div>  }   
      </div></div>}

      </div>

  )
}

export default Form