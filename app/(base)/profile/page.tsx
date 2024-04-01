import ProfileComponent from "@/components/ProfileComponent"
import { auth } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


async function page() {
      const session: any= await getServerSession(auth)

      if(!session){
        redirect("/login")
      }

  return (
      <div className="w-screen flex h-screen justify-center items-center">
            <ProfileComponent image={session?.user?.image} id={session?.user?.id} name={session?.user?.name}/>
      </div>
  )
}

export default page