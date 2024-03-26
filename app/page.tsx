import Form from "@/components/Form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
        <div className="flex justify-center items-center h-full">
            <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
                <div className="flex flex-col w-full p-5">
                  <h1 className="text-black text-xl md:mb-3">Login/Sign up</h1>
                  <Form/>
                </div>
            </div>
        </div>
    </div>

    
  );
}
