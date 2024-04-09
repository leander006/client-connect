import { NextRequest, NextResponse } from 'next/server'
import { parse } from "url";
import { createFreelancer, getFreelancer } from '@/lib/actions/freelancer';


export const GET = async(req: NextRequest) => {
      const { query } = parse(req.url, true)
      
      let username: any= query?.username
      let password: any = query?.password
      try {
            
            const res = await getFreelancer(username,password)
            return NextResponse.json(res.message,{status:res.status})

      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:502})
      }
}

export const POST =async (req: NextRequest) => {
      
    const data = await req.json();
    try {      
            const res = await createFreelancer(data.email,data.name,data.password)
            return NextResponse.json(res.message,{status:res.status})

      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:502})
      }
}