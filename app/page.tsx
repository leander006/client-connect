import Form from "@/components/Form";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";



export default async function Home() {

const session = await getServerSession(auth)
// console.log("main page session ",session);

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
