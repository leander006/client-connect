
"use client"

import { useState } from "react"
import Button from "./Button"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Input from "./Input";


function Form() {
  
  const [email, setEmail] = useState("")  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [vis, setVis] = useState(true)
  const router = useRouter();
  
  const submit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      const res = vis? await signIn("credentials", {
        username: username,
        email:email,
        password: password,
        redirect: false,
        
      }): await axios.post(`/api/auth/freelancer`,{
        username:username,
        email:email,
        password:password
      });
      console.log("response ",res);
      const {data} : any = vis &&  await axios.get(`/api/auth/freelancer?username=${username}&password=${password}`)
      if (vis) {
        router.push(`/user/${data.id}` ?? "http://localhost:3000");
      }
      else{
        alert("Account created successfully")
      }
    } catch (error) {
      alert("Something went wrong")
    }

  }
  return (
    <div>
    <form onSubmit={submit}
      className="flex justify-center text-sec flex-col item-center mt-4"
    >
      <h1 className="text-primary text-xl md:mb-3">{vis?"Login":"Sign up"}</h1>

        <Input name="Username" type="text" onChange={(e:any) => setUsername(e.target.value)}/>
        {!vis&& <Input name="Email" type="text" onChange={(e:any) => setEmail(e.target.value)}/>}
        <Input name="password" type="password" onChange={(e:any) => setPassword(e.target.value)}/>

      {vis?<Button name="Login"  type="submit" /> :
      <Button name="Sign up"  type="submit" />}
    </form>
      <div className="flex space-x-1">
          <div className="w-[50%]" onClick={() => setVis(true)}>
                <Button name="Login"  type="submit" />
          </div>
          <div className="w-[50%]" onClick={() => setVis(false)}>
                <Button name="Sign up" type="submit" />
          </div>     
      </div>
      </div>

  )
}

export default Form