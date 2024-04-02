"use client"

import axios from "axios";
import { useState } from "react";
import Users from "./Users";
import { MdOutlineCancel } from "react-icons/md";
function Search() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<[]>([])

  const debouncedSearch = (value:string) => {
    setTimeout(async () => {
      try {
        const { data } = await axios.get(`/api/auth/client?search=${value}`);
        console.log(data);
        
        setUsers(data);
      } catch (error) {
        setUsers([]);
      }
    }, 300);
  };

  const handleChange = (e:any) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full rounded-md ">
            <div className="flex items-center bg-white rounded-md pr-1.5">
                <input onChange={handleChange} value={searchTerm} className="p-1.5 w-full  rounded-md text-secondary focus:outline-none" type="text" placeholder="Search by username or email"/>
                <div className="cursor-pointer" onClick={() =>{setUsers([]); setSearchTerm("")}}>
                      <MdOutlineCancel color="#00A4FF" size={24}/>
                </div>
            </div>
            {users.length != 0 && <div className="fixed bg-primary mt-2 rounded-md p-2 w-[96%] md:w-[40%] ">
                    {users.map((u:any) =>(
                      <Users setUsers={setUsers} key={u?.id} image={u?.image} id={u?.id} name={u?.name} />
                    ))}
            </div>}
    </div>
  )
}

export default Search