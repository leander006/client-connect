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
      console.log("post request");
      
    const data = await req.json();
      try {
            const user =  await prisma.user.findFirst({
                  where:{
                        username:data.username
                  }
            })

            if(user){
                  return NextResponse.json(user)   
            }
            const newUser = await prisma.user.create({
                  data:{
                        username:data.username,
                        email:data.email,
                        password: await bcrypt.hash(data.password, Number(env?.SALT) || 0 ) 
                  }
                })
                return NextResponse.json(newUser)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong")
      }
}