

import Conversation from "./Conversation"
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";

async function Chat({p}:any) {
  
const session = await getServerSession(auth)


  return (
    <div className="h-full space-y-2 overflow-y-scroll mx-2 ">
            {p?.map((c:any) =>(
                  <Conversation key={c?.conversationId} name={c?.conversation.name} id={c?.conversation?.users[0]?.id == session?.user?.id? c?.conversation?.users[1]:c?.conversation?.users[0]}/>
            ))}

    </div>
  )
}

export default Chat