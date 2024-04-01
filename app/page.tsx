import Chats from "@/components/Chats";
import Form from "@/components/Form";
import Search from "@/components/Search";
import { auth } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "process";




export default async function Home() {

const session = await getServerSession(auth)


      if(!session){
        redirect("/login")
      }
      else{
            redirect("/home") 
      }

}
