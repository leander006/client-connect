import Chats from "@/components/Chats";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
      const session = await getServerSession(auth)
      console.log("sessoin in home page",session);
      
      return (
              <div className="h-[calc(100vh-2.3rem)]">
                    <Chats/>
              </div>
)
}
