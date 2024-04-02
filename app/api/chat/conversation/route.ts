import { auth } from '@/lib/auth';
import { create } from '@/lib/createConversation';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'


import { parse } from "url";


export const POST =async (req: NextRequest) => {    
    const data = await req.json();
    console.log(req.cookies.get("data"));
    
    
      try {
            var newConversation: any = {}
            newConversation = await prisma.userConversationRelation.findFirst({
                  where: {
                    userId: Number(data.userId2)
                  },
                  include: {
                    conversation: true,
                    user:true
                  }
            });
            if(newConversation){
                  console.log("already exists ");
                  
                  return NextResponse.json({response:newConversation,message:"Already exists"})   
            }
            console.log("new convo");
            
            newConversation = await create({prisma:prisma,userId1:data.userId1,userId2:data.userId2})
            return NextResponse.json(newConversation)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Something went wrong",{status:501})
      }
}

export const GET = async (req: NextRequest) => {
      const { query } = parse(req.url, true)
      const session = await getServerSession(auth)
      console.log("Providers", session)

      console.log(req.cookies.getAll());
      

        try {
            var conversation: any = {}
            if(query.userId != null){
                  conversation = await prisma.userConversationRelation.findMany({
                        where: {
                          userId: Number(query.userId)
                        },
                        include: {
                          conversation: {
                              select:{
                                    users:{
                                          include:{
                                                user:true
                                          }
                                    },
                              }
                          },
                          
                        }
                      });
                    if(conversation == null){
                        return NextResponse.json("conversation with above id does not exist",{status:402}) 
                    }
            }
            else{
                  conversation = await prisma.conversation.findMany({
                        include: {
                              users: {
                                select: {
                                  user: true,
                                }
                              }
                        }
                    })
            }
            return NextResponse.json(conversation)   
        } catch (error) {
              console.log(error);
              return NextResponse.json("Something went wrong",{status:501})
        }
  }
 
  