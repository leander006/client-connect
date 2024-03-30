import Chats from "@/components/Chats";
import Form from "@/components/Form";
import { auth } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { env } from "process";




export default async function Home() {

const session = await getServerSession(auth)


// const {data} = await axios.get(`${env.BASE_URL}/api/chat/conversation?userId=${session.user.id}`)


// console.log("data ",data);


      if(!session){
        return(
                <div className="h-screen">
                  <div className="flex justify-center items-center h-full">
                      <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                          <div className="flex flex-col w-full p-5">
                            <Form/>
                          </div>
                      </div>
                  </div>
                </div>
        )
      }

      return (
              <div className="h-screen">
                    <Chats/>
              </div>
)
}
