import Chats from "@/components/Chats";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home() {

const session = await getServerSession(auth)


      if(!session){
        redirect("/login")
      }

      return (
              <div className="h-screen">
                    <Chats/>
              </div>
)
}
