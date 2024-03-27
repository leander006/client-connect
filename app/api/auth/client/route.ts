import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import { env } from 'process'
import { parse } from "url";
import { randomUUID } from 'crypto'
import { sendMail } from '@/lib/sendEmail';

const prisma = new PrismaClient()

export const POST =async (req: NextRequest) => {
    const data = await req.json();
    const { query } = parse(req.url, true)
    var pass= randomUUID()
    var username = randomUUID()
      try {
            await prisma.user.create({
                  data:{
                        email:data.email,
                        username:username,
                        password: await bcrypt.hash(pass, Number(env?.SALT) || 0 ) 
                  }
                })
                await sendMail({email:data.email,subject:`${query.email} from freeconnect `,body:`${query.email} wants you to join freeconnect to discuss about your project <br></br> Please use ${username} as username and ${pass} as your password and change it to be projected from hackers`})
                return NextResponse.json(`Email send to ${data.email}`)   
      } catch (error) {
            console.log(error);
            return NextResponse.json("Soemthing went wrong")
      }
}