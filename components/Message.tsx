import { useSession } from "next-auth/react";
import Image from "next/image";


interface dataType{
      id:number,
      name:string,
      image:string,
      text:string
}

function Message({id,name,image,text}:dataType) {

      const { data: session} = useSession();
  return (
    <div className={`capitalize text-white flex flex-col md:text-xl m-2 my-6 ${session?.user?.id == id ?"items-end":"items-start"}`}>
            <div className="flex items-center space-x-2">
                  <Image width={12} height={12} className="w-6 h-6 rounded-full" src={image} alt={name} />
                  <h1>{name}</h1>
            </div>
            <div>{text}</div>
    </div>
  )
}

export default Message