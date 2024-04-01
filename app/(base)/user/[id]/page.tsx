
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Chats from "@/components/Chats";
import { redirect } from "next/navigation";


export default async function User() {
  const session = await getServerSession(auth)

  if(!session){
    redirect("/login")
  }
  return (
    <div>
      <Chats />
    </div>

  );
}
