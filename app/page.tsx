import Chats from "@/components/Chats";
import Form from "@/components/Form";

import { getValue } from "@/store/hooks/useSession";




export default async function Home() {

  const session = await getValue()
  console.log("session values ",session);
  
if(session){
  return (
    <div>
      <Chats/>
    </div>
  )
}

  return (
    <div className="h-screen">
        <div className="flex justify-center items-center h-full">
            <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                <div className="flex flex-col w-full p-5">
                  <Form/>
                </div>
            </div>
        </div>
    </div>

    
  );
}
