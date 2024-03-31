import { atom } from "recoil";

interface userData{
    name:string,
    image:string
}

export const UserAtom = atom<userData>({
    key: "userAtom",
    default: {name:"",image:""},
})