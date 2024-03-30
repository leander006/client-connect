import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { env } from 'process';
import axios from "axios"

export const auth ={
      providers: [
        CredentialsProvider({
          name: "Credentials",
    
          credentials: {
            username: {
              label: "username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
    
          async authorize(credentials, req) {
            if (!credentials?.username || !credentials?.password) return null;
            try {
              const {data} = await axios.get(`${env.BASE_URL}/api/auth/freelancer?username=${credentials?.username}&password=${credentials?.password}`)  
              console.log(data);
              
              return {name:data.name,email:data.email,id:data.id,image:data.image};
            } catch (e) {
              console.error(e);
              return null;
            }
          },
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks:{
        session:({session,token}: any ) =>{
          if (session?.user) {
            session.user.id = token.sub;
          }
          return session;
        },
        async redirect({ url, baseUrl }:any) {
          
          return baseUrl
        }
      },
      pages:{
            signIn:"/"
      }
    }