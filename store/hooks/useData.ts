
"use client"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../atoms/user";


export const useBalance = () => {
    const value =  useRecoilValue(UserAtom);
    console.log("value ",value);
    
    return value;
}   