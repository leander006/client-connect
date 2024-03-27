import Image from "next/image";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import axios from "axios";

export default async function Home() {
  const session = await getServerSession(auth)
console.log("main page session ",session);
// const conversation = await axios.get("/api/")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-blue-900">
     user
    </main>
  );
}
