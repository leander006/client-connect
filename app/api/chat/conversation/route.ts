import { createConversation, getConversation } from "@/lib/actions/conversation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

  const data = await req.json();
    try {      
        const res = await createConversation(data.userId1)
        return NextResponse.json(res.message,{status:res.status})

    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{status:502})
    }
};

export const GET = async (req: NextRequest) => {

    try {      
        const res = await getConversation()
        return NextResponse.json(res.message,{status:res.status})

    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{status:502})
    }
};
