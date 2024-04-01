import NextAuth from "next-auth";

declare module "next-auth"{
      interface Session{
            user:{
                  id:Number,
                  name:string,
                  email:string,
                  image:string,
                  password:string
            }

      }
}