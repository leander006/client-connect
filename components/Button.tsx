import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";

interface input{
      name:String,
      type:String,
      onclick:() => Promise<void>
}

function Button(data:input) {
  return (
      <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-[#03512f] my-2">
            {data.type == "google" &&  <FaGoogle size={24}/>}
            {data.type == "github" && <FaGithub  size={24}/>}
            {data.type == "login" && <RiLoginCircleLine size={24}/>}
            <button onClick={data.onclick} className="w-full" >
              {data.name}
            </button>
      </div>
  )
}

export default Button