"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from 'next-auth/react';

export const Providers = ({children,session}: {children: React.ReactNode,session:any}) => {
    return (
    <SessionProvider session={session}>
        <RecoilRoot>
            {children}
        </RecoilRoot>
    </SessionProvider>
)}