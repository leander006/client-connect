
"use client"

import { useState } from "react"
import Button from "./Button"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Form() {
  
  const [email, setEmail] = useState("")  
  const [password, setPassword] = useState("")
  const router = useRouter();
  return (
      <div>
            <form
      className="flex justify-center text-black flex-col item-center mt-4"
    >
      <label className="mb-2">Email</label>
      <input
        className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        required
      />
      <label className="mb-2">Password</label>
      <input
        className="w-full h-12 mb-4 rounded-md p-3 md:mb-8  border border-black"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />
      <Button name="Login" type="login" onclick={async () => {
            console.log("hello from login");
            
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            console.log("res ",res);
            // router.push("/")
        }}/>
    </form>
    <Button name="Login with google" type="google" onclick={async () => {
            await signIn("google");
        }}/>
      <Button name="Login with github" type="github" onclick={async () => {
            await signIn("google");
        }}/>
      </div>

  )
}

export default Form