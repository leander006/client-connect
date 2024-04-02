"use client"

import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HandleButton from "./HandleButton";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface userType{
      name:string,
      id:Number,
      image:string
}

function ProfileComponent({name,id,image}:userType) {
      const [vis, setVis] = useState(false)
      const [updatedName, setUpddatedName] = useState("")
      const [updatedPassword, setUpdatedPassword] = useState("")
      const {data:session,update} = useSession()
      const router = useRouter()
      
      const updateUser = async(e:any) =>{
            e.preventDefault()
            try {
                  const {data} = await axios.put(`/api/auth/client?id=${id}`,{name:updatedName,password:updatedPassword})
                  console.log(data);
                  if(updatedName){
                        update({name:updatedName})
                  }
                  if(updatedPassword){
                        update({password:updatedPassword})
                  }
                  router.push("/")
                  toast.success("Profile updated successfully")
            } catch (error:any) {
                  console.log(error);
                  toast.error(error?.response?.data?error?.response?.data:"Something went worng")
            }
      }

      const message = async() =>{
            try {
                  const {data} =await axios.post(`/api/chat/conversation`,{userId1:session?.user?.id,userId2:id})
                  console.log("profile page convo " ,data);
                  if(data.message == "Already exists"){
                        router.push(`/user/${session?.user?.id}/${data.response.conversation.id}`)
                        localStorage.setItem("name",data.response.user.name)
                        localStorage.setItem("image",data.response.user.image)
                  }
                  else{
                        toast.success("Convesation created successfully")
                        router.push(`/user/${session?.user?.id}/${data.id}`)
                  }
            } catch (error:any) {
                  console.log(error);
                  toast.error(error?.response?.data?error?.response?.data:"Something went worng")
            }
      }
  return (
      <div className={`flex flex-col p-3 w-[91vw] h-fit lg:w-[400px] md:w-[300px] bg-white rounded-lg md:justify-center`}>

           {vis &&
                  <div>
                       <form onSubmit={updateUser} className="flex justify-center text-secondary flex-col item-center mt-4">
                             <h1 className="text-primary text-xl text-center md:mb-3">Update Profile</h1>
                             {<Input required={false} name="Username" type="text" onChange={(e:any) => {setUpddatedName(e.target.value)}}/>}
                             {<Input required={false} name="password" type="password" onChange={(e:any) => {setUpdatedPassword(e.target.value)}}/>}
           
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
                  <Image width={12} height={12} className="w-24 h-24 rounded-full" src={image} alt={name} />
                  <h1 className="text-sm md:text-lg capitalize my-6 text-center">{name}</h1>
                  <div className="flex space-x-1 w-full">
                  {id !=  session?.user?.id ? <div className="w-full">
                              <HandleButton name="Message" onClick={message}/>
                        </div>
                         : <div className="w-full">
                              <HandleButton name="Edit" onClick={() =>setVis(!vis)}/>
                        </div>}
                  </div>
            </div>
      </div>}
            
      </div>
  )
}

export default ProfileComponent