"use client"

import axios from "axios";
import { env } from "process";
import { useEffect, useState } from "react";
import Users from "./Users";

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
            <input onChange={handleChange} value={searchTerm} className="p-1.5 w-full  rounded-md text-secondary focus:outline-none" type="text" placeholder="Search by username or email"/>
            {users.length != 0 && <div className="fixed bg-primary mt-2 rounded-md p-2 w-[96%] md:w-[40%] ">
                    {users.map((u:any) =>(
                      <Users setUsers={setUsers} key={u?.id} image={u?.image} id={u?.id} name={u?.name} />
                    ))}
            </div>}
    </div>
  )
}

export default Search