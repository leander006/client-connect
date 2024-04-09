import ProfileComponent from "@/components/ProfileComponent"
import { getClient } from "@/lib/actions/client";
import axios from "axios"


async function page({
      params,
    }: {
      params: { id: Number};
    }) {
      const { id } = params;

      const {message} :any = await getClient("",id)

      
  return (
      <div className="w-screen flex h-screen justify-center items-center">
            <ProfileComponent image={message?.image} id={message?.id} name={message?.name}/>
      </div>
  )
}

export default page