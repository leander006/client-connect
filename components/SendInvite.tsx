"use client"
import { useRouter } from "next/navigation"

function SendInvite() {
      const router = useRouter()
  return (
    <div className="pt-3">
            <h1 onClick={() => router.push("/invite")} className=" bg-secondary rounded-md p-3 cursor-pointer text-lg">Invite new clients</h1>
    </div>
  )
}

export default SendInvite