"use client"

import { useRouter } from "next/navigation"

function Search() {
      const router = useRouter()
  return (
    <div className="pt-3">
            <h1 onClick={() => router.push("/client")} className=" bg-secondary rounded-md p-3 cursor-pointer text-lg">Invite new clients</h1>
    </div>
  )
}

export default Search