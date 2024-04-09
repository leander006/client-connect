"use server";

import { randomUUID } from "crypto";
import prisma from "../prisma";
import { getServerSession } from "next-auth";
import { auth } from "../auth";
import { sendMail } from "../sendEmail";
import bcrypt from "bcryptjs"


export async function createClient(
  email: string,
) {
      const session = await getServerSession(auth);
      const salt :any=process.env.SALT
      if (!session?.user || !session.user?.id) {
        return {
          message: "Unauthenticated request",
          status:401
        };
      }
      var pass= randomUUID()
      var username = randomUUID()
        try {
              
              if(!email){
                    return { message:"Please fill email field",status:401 }
              }
  
              let user = await prisma.user.findFirst({
                    where:{
                          email
                    }
              })
  
              if(user){
                    return { message:`User with above email exists with username ${user.name}`,status:401 }
              }
              user = await prisma.user.create({
                    data:{
                          email,
                          name:username,
                          password: await bcrypt.hash(pass, Number(salt)) 
                    }
                  })
                  const newConversation = await prisma.conversation.create({});
                  await prisma.userConversationRelation.createMany({
                    data: [
                      {
                        userId: Number(user.id),
                        conversationId: newConversation.id
                      },
                      {
                        userId:Number(session.user?.id),
                        conversationId: newConversation.id
                      }
                    ]
                  });
                  await sendMail({email:email,subject:`${session.user?.name} from freeconnect `,para:`${session.user?.name} wants you to join freeconnect to discuss about your project <br></br> Please use ${username} as username and ${pass} as your password and change it to be projected from hackers`,title:`${session.user?.name} from freeconnect `,link:`${process.env.BASE_URL}`})
                  return {message: `Email send to ${email}`,status:201 }   
        } catch (error) {
              console.log(error);
              return { message:error,status:502 }
        }
}

export async function getClient(
      search: string,
      id:Number
    ) {
          const session = await getServerSession(auth);
          if (!session?.user || !session.user?.id) {
            return {
              message: "Unauthenticated request",
              status:401
            };
          }

          try {
                if(id){
                      const user = await prisma.user.findUnique({
                            where:{
                                  id:Number(id)
                            },
                            select:{
                                  id:true,
                                  name:true,
                                  image:true
                            }
                      })
                      
                      if(!user){
                            return {message: "No user found",status:401 }
                        }
                      return {message:user,status:200}  
                }
                  const users =await prisma.user.findMany({
                      where:{
                            OR: [
                                  {
                                    name: {
                                      contains: String(search)
                                    }
                                  },
                                  {
                                    email: {
                                      contains: String(search)
                                    }
                                  }
                            ]
                      }
                  })
                  if(users.length == 0){
                      return {message: "No user found" ,status:401}
                  }
                return {message:users,status:200}  
    
            } catch (error) {
                  console.log(error);
                  return {message: error,status:502 }
            }
}

export async function updateClient(
      name: string,
      password:string,
){
      const session = await getServerSession(auth);
      if (!session?.user || !session.user?.id) {
        return {
          message: "Unauthenticated request",
          status:401
        };
      }

      if(!password && !name){
            return {message: `Update either name or password`,status:401} 
      }
        try {

              let user = await prisma.user.findFirst({
                  where:{
                        name:name
                  }
              })
              console.log("user is null",user != null);
              
              if(user != null){
                  return { message :`User with above name exists`,status:401 } 
              }

             user = await prisma.user.findFirst({
                  where:{
                        id:Number(session.user?.id)
                  }
              })

              
              const updatedname = name != "" ? name: user?.name
              const updatedpassword = password  != "" ? await bcrypt.hash(password || "" , Number(process.env?.SALT) || 0 ) : user?.password
              
              user = await prisma.user.update({
                  data:{
                        name:updatedname,
                        password:updatedpassword
                  },
                  where:{
                        id:Number(session.user?.id)
                  }
              })

            return {message:`User updated with new credentials`,status:200}
              
        } catch (error) {
              console.log(error);
              return { message :error,status:502 }
        }
}