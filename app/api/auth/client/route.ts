
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import { env } from 'process'
import { parse } from "url";
import { randomUUID } from 'crypto'
import { sendMail } from '@/lib/sendEmail';
import { create } from '@/lib/createConversation';
import { prisma } from '@/lib/prisma';



export const POST =async (req: NextRequest) => {
    const data = await req.json();
    const { query } = parse(req.url, true)
    var pass= randomUUID()
    var username = randomUUID()
      try {
            const user =await prisma.user.create({
                  data:{
                        email:data.email,
                        name:username,
                        password: await bcrypt.hash(pass, Number(env?.SALT) || 0 ) 
                  }
                })
                create({prisma:prisma,name:data.name,userId1:user.id,userId2:data.userId})
                await sendMail({email:data.email,subject:`${query.name} from freeconnect `,para:`${query.name} wants you to join freeconnect to discuss about your project <br></br> Please use ${username} as username and ${pass} as your password and change it to be projected from hackers`,title:`${query.name} from freeconnect `,link:`${env.NEXTAUTH_URL}`})
                return NextResponse.json(`Email send to ${data.email}`)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong",{status:501})
      }
}