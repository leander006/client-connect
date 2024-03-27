
"use client"

import { useState } from "react"
import Button from "./Button"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";


function Form() {
  
  const [email, setEmail] = useState("")  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [vis, setVis] = useState(false)
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
      className="flex justify-center text-black flex-col item-center mt-4"
    >
      <h1 className="text-black text-xl md:mb-3">{vis?"Login":"Sign up"}</h1>
      <label className="mb-2">Username</label>
      <input
        className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        required
      />
      {!vis && <label className="mb-2">Email</label>}
      {!vis && <input
        className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        required
      />}
      <label className="mb-2">Password</label>
      <input
        className="w-full h-12 mb-4 rounded-md p-3 md:mb-8  border border-black"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />
      {vis?<Button name="Login" refer="login" type="submit" /> :
      <Button name="Sign up" refer="login" type="submit" />}
    </form>
      <div className="flex space-x-1">
          <div className="w-[50%]" onClick={() => setVis(true)}>
                <Button name="Login" refer="login" type="submit" />
          </div>
          <div className="w-[50%]" onClick={() => setVis(false)}>
                <Button name="Sign up" refer="login" type="submit" />
          </div>     
      </div>
      </div>

  )
}

export default Form