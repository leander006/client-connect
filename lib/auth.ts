import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient} from '@prisma/client'



export const auth ={
      providers: [
        CredentialsProvider({
            name: 'email',
            credentials: {
              email: { label: 'email', type: 'text', placeholder: '' },
              password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
              console.log("credentials ",credentials);
              
              const prisma = new PrismaClient()
              const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              // const user = await res.json()
              const user = await prisma.user.findFirst({
                where:{
                  email:credentials.email
                }
              })
              console.log(user);
              
                return {
                    id: "user1",
                    name:"leander",
                    email:"leanderdsilva06@gmail.com"
                };
            },
            
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          },
          
          ),
          GitHubProvider({
            clientId: process.env.GITHUB_ID || " ",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks:{
        session:({session,token,user}: any ) =>{
          session.user.id = token.sub
          return session
        },
        async redirect({ url, baseUrl }:any) {
          console.log("baseUrl ",baseUrl);
          
          return baseUrl
        }
      },
      pages:{
            signIn:"/signIn"
      }
    }