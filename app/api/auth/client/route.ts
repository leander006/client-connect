
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
import { env } from 'process'
import { parse } from "url";
import { randomUUID } from 'crypto'
import { sendMail } from '@/lib/sendEmail';
import { create } from '@/lib/createConversation';
import prisma from '@/lib/prisma';




export const POST =async (req: NextRequest) => {
    const data = await req.json();
    const { query } = parse(req.url, true)
    var pass= randomUUID()
    var username = randomUUID()
      try {
            
            if(!data.email){
                  return NextResponse.json(`Please fill email field`,{status:401}) 
            }

            let user = await prisma.user.findFirst({
                  where:{
                        email:data.email
                  }
            })

            if(user){
                  return NextResponse.json(`User with above email exists`,{status:401}) 
            }
            user =await prisma.user.create({
                  data:{
                        email:data.email,
                        name:username,
                        password: await bcrypt.hash(pass, Number(env?.SALT) || 0 ) 
                  }
                })
                create({prisma:prisma,userId1:user.id,userId2:data.userId})
                await sendMail({email:data.email,subject:`${query.name} from freeconnect `,para:`${query.name} wants you to join freeconnect to discuss about your project <br></br> Please use ${username} as username and ${pass} as your password and change it to be projected from hackers`,title:`${query.name} from freeconnect `,link:`${env.NEXTAUTH_URL}`})
                return NextResponse.json(`Email send to ${data.email}`)   
      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:501})
      }
}

export const GET =async (req: NextRequest) => {

      const { query } = parse(req.url, true)

      try {

            if(query.id){
                  const user = await prisma.user.findUnique({
                        where:{
                              id:Number(query.id)
                        },
                        select:{
                              id:true,
                              name:true,
                              image:true
                        }
                  })
                  
                  if(!user){
                        return NextResponse.json("No user found",{status:401})
                    }
                  return NextResponse.json(user)  
            }
              const users =await prisma.user.findMany({
                  where:{
                        OR: [
                              {
                                name: {
                                  contains: String(query.search)
                                }
                              },
                              {
                                email: {
                                  contains: String(query.search)
                                }
                              }
                        ]
                  }
              })
              if(users.length == 0){
                  return NextResponse.json("No user found",{status:401})
              }
            return NextResponse.json(users)  

        } catch (error) {
              console.log(error);
              return NextResponse.json(error,{status:501})
        }
  }


  export const PUT =async (req: NextRequest) => {
      const data = await req.json();
      const { query } = parse(req.url, true)

      if(!data.password && !data.name){
            return NextResponse.json(`Update either name or password`,{status:402}) 
      }
        try {

              let user = await prisma.user.findFirst({
                  where:{
                        OR:[
                              {
                                    email:data.email
                              },
                              {
                                    name:data.name
                              }
                        ]
                  }
              })

              if(user){
                  return NextResponse.json(`User with above name or email exists`,{status:401}) 
              }

             user = await prisma.user.findFirst({
                  where:{
                        id:Number(query.id)
                  }
              })
              console.log("data.name ",data.name == "");
              
              const name = data.name != "" ? data.name: user?.name
              const password = data.password  != "" ? await bcrypt.hash(data.password , Number(env?.SALT) || 0 ) : user?.password
              
              user = await prisma.user.update({
                  data:{
                        name:name,
                        password:password
                  },
                  where:{
                        id:Number(query.id)
                  }
              })

            return NextResponse.json(`User updated with new credentials`) 
              
        } catch (error) {
              console.log(error);
              return NextResponse.json(error,{status:501})
        }
  }