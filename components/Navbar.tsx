"use client"
import Link from "next/link";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from 'next-auth/react';

function Navbar() {

  const {data} =  useSession()  
  const links = [
    { id: 1, links: "/invite",name:"invite" },
  ];
  const [nav, setNav] = useState(false);
  
  return (
    <div className="flex justify-between items-center bg-background w-full shadow-xl z-50 fixed h-12 ">
      <div>
        <Link href="/" className="ml-2 text-primary text-2xl md:text-4xl font-serif">Freeconnect</Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ links, id,name }) => (
          <li
            key={id}
              className="text-white mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
          >
            <Link href={links}>
              {name}
            </Link>
          </li>
        ))}

        {data && <div onClick={() => signOut()} className="mx-4 cursor-pointer hover:scale-125 duration-300">Logout</div>}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="flex text-black/60 md:hidden mr-2"
      >
        {!nav && (
            <GiHamburgerMenu color="#00A4FF" size={24}/>
        )}
      </div>
      {nav && (
        <div className="left-0 top-0 fixed z-50 w-full h-screen bg-black/70 ">
          <ul className="flex flex-col p-2 top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] bg-background h-screen text-white">
            <div className=" mt-4 w-full items-center">
              <div className="flex justify-between">
                <h1 className="ml-2 text-primary text-2xl md:text-4xl font-serif">
                  Freeconnect
                </h1>
                <div
                  onClick={() => setNav(!nav)}
                  className="flex cursor-pointer text-black/60 justify-center md:hidden"
                >
                  {nav && (
                    <MdCancel color="#00A4FF" size={24}/>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-16 items-center">
              {links.map(({ links, id,name }) => (
                <li
                  key={id}
                  className="text-white py-6 mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
                >
                  <Link
                    onClick={() => setNav(!nav)}
                    href={links}
                  >
                    {name}
                  </Link>
                </li>
                
              ))}
            {data && <div onClick={() => signOut()} className="py-6 cursor-pointer hover:scale-125 duration-300">Logout</div>}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;