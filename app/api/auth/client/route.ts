
import { NextRequest, NextResponse } from 'next/server'
import { parse } from "url";
import { createClient, getClient, updateClient } from '@/lib/actions/client';

export const POST =async (req: NextRequest) => {
    const data = await req.json();
      try {
            
            const res = await createClient(data.email)
            return NextResponse.json(res.message,{status:res.status})

      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:502})
      }
}

export const GET =async (req: NextRequest) => {

      const { query } = parse(req.url, true)
      const search:any = query?.search
      const id :any = query?.id
      try {
            
            const res = await getClient(search,id)
            return NextResponse.json(res.message,{status:res.status})
            
      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:502})
      }
}

export const PUT =async (req: NextRequest) => {
      const data = await req.json();
      const { query } = parse(req.url, true)
      const name :any = data.name
      const password :any = data.password
      const id:any = query?.id
      try {
            const res = await updateClient(name,password)
            return NextResponse.json(res.message,{status:res.status})
            
      } catch (error) {
            console.log(error);
            return NextResponse.json(error,{status:502})
      }
}