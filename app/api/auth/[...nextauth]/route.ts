import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from "../../../../lib/auth";


const handler = NextAuth(auth)

export const GET = handler;
export const POST = handler;