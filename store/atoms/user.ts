import { atom } from "recoil";

interface userData{
    id:number,
    email:string,
    Conversation:[]
}

export const UserAtom = atom<userData>({
    key: "userAtom",
    default: {id:-1,email:"",Conversation:[]},
})