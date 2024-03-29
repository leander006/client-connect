import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";

interface input{
      name:String,
      type: "button" | "submit" | "reset",
}

function Button({type,name}:input) {
  return (
      <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
            {/* {data.refer == "google" &&  <FaGoogle size={24}/>}
            {data.refer == "github" && <FaGithub  size={24}/>}
            {data.refer == "login" && <RiLoginCircleLine size={24}/>} */}
            <button type={type} className="w-full" >
              {name}
            </button>
      </div>
  )
}

export default Button