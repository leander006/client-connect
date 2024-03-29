import { create } from '@/lib/createConversation';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

import { parse } from "url";


export const POST =async (req: NextRequest) => {    
    const data = await req.json();
      try {
            const newConversation = await create({prisma:prisma,name:data.name,userId1:data.userId1,userId2:data.userId2})
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
 
  