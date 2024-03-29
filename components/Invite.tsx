"use client"

import { useState } from "react"
import Input from "./Input"


function Invite() {
const [email, setEmail] = useState("")
  return (
      <div className="flex justify-center items-center h-full">
            <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                <div className="flex flex-col w-full p-5">
                        <Input type="email" name="email" onChange={(e:any) => setEmail(e.target.value)} />
                        <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
                              <button type="button" className="w-full">Invite</button>
                        </div>
                </div>
            </div>
      </div>
  )
}

export default Invite