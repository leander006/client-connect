import { useSession } from "next-auth/react";


interface dataType{
      id:number,
      name:string,
      image:string,
      text:string
}

function Message({id,name,image,text}:dataType) {
      const { data: session, status } = useSession();
      
  return (
    <div className={`capitalize text-white flex flex-col md:text-xl m-2 my-6 ${session?.user?.id != id ?"items-end":"items-start"}`}>
            <div className="flex items-center space-x-2">
                  <img className="w-6 h-6 rounded-full" src={image} alt={name} />
                  <h1>{name}</h1>
            </div>
            <div>{text}</div>
    </div>
  )
}

export default Message