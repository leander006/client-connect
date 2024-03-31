import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
import { parse } from "url";


export const POST =async (req: NextRequest) => {    
    const data = await req.json();
    const { query } = parse(req.url, true)

      try {
            const message = await prisma.message.create({
                  data: {
                    body:data.body,
                    senderId: Number(query.userId ),
                    conversationId: Number(query.id)
                  }
                });

                return NextResponse.json(message)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong",{status:501})
      }
}

export const GET = async (req: NextRequest) => {
      const { query } = parse(req.url, true)
      console.log("query from id ",query.id);
      
        try {
            var message: any = {}            
            if(query.id != null){
                  message = await prisma.message.findMany({
                        where:{
                              conversationId: Number(query.id)
                        },
                        include:{
                              sender:true
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
            return NextResponse.json(message)   
        } catch (error) {
              console.log(error);
              return NextResponse.json("Soemthing went wrong",{status:501})
        }
  }
 
  