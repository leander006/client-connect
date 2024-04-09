"use server";

import { getServerSession } from "next-auth";
import { auth } from "../auth";
import prisma from "../prisma";



export async function createMessage(body:string,id:Number){
      try {
            const session = await getServerSession(auth);
            if (!session?.user || !session.user?.id) {
              return {
                message: "Unauthenticated request",
                status:401
              };
            }

            const message = await prisma.message.create({
                  data: {
                    body:body,
                    senderId: Number(session.user?.id),
                    conversationId: Number(id)
                  },
                  include:{
                        sender:true,
                        conversation:{
                              include:{
                                    users:{
                                          include:{
                                                user:true
                                          }
                                    }
                              }
                        }
                  }
                });

                return {message:message,status:201}
      } catch (error) {
            console.log(error);
            return {message: error,status:502}
      }
}

export async function getMessage(id:Number){

        try {

            const session = await getServerSession(auth);
            // console.log("session from message ",session?.user);
            
            if (!session?.user || !session.user?.id) {
              return {
                message: "Unauthenticated request",
                status:402
              };
            }

            var message: any = {}            
            if(id != null){
                  message = await prisma.message.findMany({
                        where:{
                              conversationId: Number(id)
                        },
                        include:{
                              sender:true,
                              conversation:{
                                    include:{
                                          users:{
                                                include:{
                                                      user:true
                                                }
                                          }
                                    }
                              }
                        }
                    })
                  //   console.log("message ",message);
                    
                    if(message == null){
                        return {message:"message with above id does not exist",status:401}
                    }
            }
            else{
                  message = await prisma.message.findMany({
                        include:{
                              sender:true
                        }
                  })
            }
            // const filteredArray:[]  = message[0]?.conversation?.users.filter((u:any) => u.userId === query.userId)
            // if(filteredArray?.length > 0){
            //       return NextResponse.json("Not authenticated",{status:402})   
            // }
            return {message:message,status:200} 
        } catch (error) {
              console.log(error);
              return {message:error,status:502}
        }
}
