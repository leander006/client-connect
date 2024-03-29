import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import { env } from 'process'
import { parse } from "url";
const prisma = new PrismaClient()

export const GET = async(req: NextRequest) => {
      const { query } = parse(req.url, true)
      console.log("get request");
      

      let username: any= query.username
      let password: any = query.password
      if(query.username == undefined || query.password == undefined){
            return NextResponse.json("Enter email and password")
      }
        try {
              const user = await prisma.user.findFirst({
                  where:{
                        username:username,
                  },
                  select:{
                        id:true,
                        email:true,
                        username:true,
                        image:true,
                        password:true
                  }
              })
            if(!user){
                  return NextResponse.json(null)   
            }  
            const validate = await bcrypt.compare(password,user?.password||"")
            if(!validate){
                  return NextResponse.json("Enter correct password")   
            }
            return NextResponse.json(user)   
        } catch (error) {
              console.log(error);
              return NextResponse.error
        }
}

export const POST =async (req: NextRequest) => {

      
    const data = await req.json();
      try {
            const newMessage = await prisma.message.create({
                  data: {
                    body:data.body,
                    conversation: [
                      connect: { id: data.conversationId }
                    ],
                    sender: {
                      connect: { id: data.userId }
                    }
                  }
                });
                return NextResponse.json(newMessage)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong")
      }
}