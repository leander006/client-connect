"use client"

import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HandleButton from "./HandleButton";
import axios from "axios";
import toast from "react-hot-toast";

interface userType{
      name:string,
      id:Number,
      image:string
}

function ProfileComponent({name,id,image}:userType) {
      const [vis, setVis] = useState(false)
      const [updatedName, setUpddatedName] = useState("")
      const [updatedPassword, setUpdatedPassword] = useState("")
      const {data:session} = useSession()
      const router = useRouter()
      
      const update = async(e:any) =>{
            e.preventDefault()
            try {
                  const {data} = await axios.put(`/api/auth/client?id=${id}`,{name:updatedName,password:updatedPassword})
                  console.log(data);
                  router.push("/")
                  toast.success("Profile updated successfully")
            } catch (error:any) {
                  console.log(error);
                  toast.error(error?.response?.data?error?.response?.data:"Something went worng")
            }
      }
  return (
      <div className={`flex flex-col p-3 w-[91vw] h-fit lg:w-[400px] md:w-[300px] bg-white rounded-lg md:justify-center`}>

           {vis &&
                  <div>
                       <form onClick={update} className="flex justify-center text-secondary flex-col item-center mt-4">
                             <h1 className="text-primary text-xl md:mb-3">Profile</h1>
                             {<Input name="Username" type="text" onChange={(e:any) => {setUpddatedName(e.target.value)}}/>}
                             {<Input name="password" type="password" onChange={(e:any) => {setUpdatedPassword(e.target.value)}}/>}
           
                              <div className="w-full">
                                    <Button name="Update" type="submit" />
                              </div>
                       </form>
                              <div className="w-full">
                                    <HandleButton name="Cancel" onClick={() =>setVis(!vis)}/>
                              </div>
                  </div>
            }

           {!vis && <div className="text-primary w-full space-x-3 ">
            <div className="flex flex-col items-center w-full justify-center ">
                  <h1 className="md:text-xl my-3">User Profile</h1>
                  <img className="w-24 h-24 rounded-full" src={image} alt={name} />
                  <h1 className="md:text-3xl capitalize my-6">{name}</h1>
                  <div className="flex space-x-1 w-full">
                        <div className="w-[50%]">
                              <HandleButton name="Message" onClick={() =>router.push("/")}/>
                        </div>
                        <div className="w-[50%]">
                              <HandleButton name="Edit" onClick={() =>setVis(!vis)}/>
                        </div>
                  </div>
            </div>
      </div>}
            
      </div>
  )
}

export default ProfileComponent