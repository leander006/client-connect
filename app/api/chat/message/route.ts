import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
import { parse } from "url";


export const POST =async (req: NextRequest) => {    
    const data = await req.json();
    const { query } = parse(req.url, true)

      try {
            const message = await prisma.message.create({
                  data: {
                    body:data.body,
                    senderId: Number(query.userId),
                    conversationId: Number(query.id)
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

                return NextResponse.json(message)   
      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:501})
      }
}

export const GET = async (req: NextRequest) => {
      const { query } = parse(req.url, true)
      // console.log("query from id ",query.id);
      // console.log(req);
      
        try {
            var message: any = {}            
            if(query.id != null){
                  message = await prisma.message.findMany({
                        where:{
                              conversationId: Number(query.id)
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
                    if(message == null){
                        return NextResponse.json("message with above id does not exist",{status:402}) 
                    }
            }
            else{
                  message = await prisma.message.findMany({
                        include:{
                              sender:true
                        }
                  })
            }
            const filteredArray:[]  = message[0]?.conversation?.users.filter((u:any) => u.userId === query.userId)
            if(filteredArray?.length > 0){
                  return NextResponse.json("Not authenticated",{status:402})   
            }
            return NextResponse.json(message)   
        } catch (error) {
              console.log(error);
              return NextResponse.json(error,{status:501})
        }
  }
 
  