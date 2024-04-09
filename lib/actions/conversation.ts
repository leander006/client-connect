"use server";

import { getServerSession } from "next-auth";
import { auth } from "../auth";
import prisma from "../prisma";



export async function createConversation(userId1:Number){
      try {
            const session = await getServerSession(auth);
            if (!session?.user || !session.user?.id) {
              return {
                message: "Unauthenticated request",
                status:401
              };
            }
            
            const conversation = await prisma.conversation.findFirst({
              where: {
                users: {
                  every: {
                    userId: {
                      in: [Number(userId1),Number(session?.user?.id)],
                    },
                  },
                },
                
              },
              select:{
                users:{
                  include:{
                    user:true
                  }
                },
                id:true
              }
            })

            console.log("convo from server ",conversation?.users.filter((u) => u.userId != session.user.id));
            
            if(conversation != null ){
              return {message:conversation?.users.filter((u) => u.userId != session.user.id)[0],type:"old",status:200 }
            }
            
            
            const newConversation = await prisma.conversation.create({select:{
              id:true,
              users:true
            }});
            
            await prisma.userConversationRelation.createMany({
              data: [
                {
                  userId: Number(userId1),
                  conversationId: newConversation.id
                },
                {
                  userId:Number(session.user?.id),
                  conversationId: newConversation.id
                }
              ]
            }
            );

            const newConvo= await prisma.conversation.findFirst({
              where:{
                id:newConversation.id
              },
              select:{
                id:true,
                users:{
                  include:{
                    user:true,
                  }
                }
              }
            })
         return {message:newConvo?.users.filter((u) => u.userId != session.user.id)[0],type:"new",status:200 }
      } catch (error) {
            console.log(error);
            return { message:error ,status:502}
            
      }
}

export async function getConversation(){
      try {

            const session = await getServerSession(auth);
            
            if (!session?.user || !session.user?.id) {
              return {
                message: "Unauthenticated request",
                status:402
              };
            }
            

            var conversation:any = {};
            if (session?.user?.id != null) {
              conversation = await prisma.userConversationRelation.findMany({
                where: {
                  userId: Number(session.user?.id),
                },
                include: {
                  conversation: {
                    select: {
                      users: {
                        include: {
                          user: true,
                        },
                      },
                    },
                  },
                },
              });
              if (conversation == null) {
                return {message:"conversation with above id does not exist",status:401 }
              }
            } else {
              conversation = await prisma.conversation.findMany({
                include: {
                  users: {
                    select: {
                      user: true,
                    },
                  },
                },
              });
            }
            return {message:conversation,status:200};
          } catch (error) {
            console.log(error);
            return { message: error, status:502 }
          }
}
