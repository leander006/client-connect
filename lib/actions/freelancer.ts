"use server";

import bcrypt from "bcryptjs"
import prisma from "../prisma";

export async function createFreelancer(
      email: string,
      name:string,
      password:string
    ) {
      const salt : any=process.env.SALT
      try {
            const user =  await prisma.user.findFirst({
                  where:{
                        OR:[
                              {
                                    email:email
                              },
                              {
                                    name:name
                              }
                        ]
                  }
            })

            if(user){
                  return {message: "User with above email or name exists" ,status:401 }   
            }
            await prisma.user.create({
                  data:{
                        name:name,
                        email:email,
                        password: await bcrypt.hash(password,Number(salt))
                  }
                })
            return {message: "User created please login",status:200} 
      } catch (error) {
            console.log(error);
            return {message: error,status:502}
      }
}

export async function getFreelancer(
      username: string,
      password:string,
    ) {


      if(username == undefined || password == undefined){
            return {message: "Enter email and password",status:401 }
      }
        try {
              const user = await prisma.user.findFirst({
                  where:{
                        name:username,
                  },
                  select:{
                        id:true,
                        email:true,
                        name:true,
                        image:true,
                        password:true,                        
                  }
              })
            
            if(!user){
                  return { message:"User doesn't exist",status:401  }
            }  
            const validate = await bcrypt.compare(password,user?.password||"")
            if(!validate){
                  return { message:"Enter correct password",status:401  } 
            }
            console.log("done with api call");
            
            return {message:user,status:200} 
        } catch (error) {
            console.log(error);
            return { message:error,status:502 }
        }
}
