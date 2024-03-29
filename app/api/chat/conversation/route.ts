import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { parse } from "url";
const prisma = new PrismaClient()

export const POST =async (req: NextRequest) => {    
    const data = await req.json();
      try {
            const newConversation = await prisma.conversation.create({
                  data: {
                    name:data.name
                  }
                });
                await prisma.userConversationRelation.createMany({
                  data: [
                    {
                      userId: data.user1Id,
                      conversationId: newConversation.id
                    },
                    {
                      userId: data.user2Id,
                      conversationId: newConversation.id
                    }
                  ]
                });
                return NextResponse.json(newConversation)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong",{status:501})
      }
}

export const GET = async (req: NextRequest) => {
      const { query } = parse(req.url, true)
        try {
            var conversation: any = {}
            if(query.id != null){
                  conversation = await prisma.conversation.findFirst({
                        where:{
                              id: Number(query.id)
                        },
                        include: {
                              users: {
                                select: {
                                  user: true,
                                }
                              },
                              messages:{
                                    include:{
                                          sender:true
                                    }
                              }
                            }
                    })
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
              return NextResponse.json("Soemthing went wrong",{status:501})
        }
  }
 
  