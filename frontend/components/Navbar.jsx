"use client";
import Link from "next/link";
import React, {  useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "./Container";
import { AuthContext } from "@/context/AuthContext";


export default function Navbar() {
 // We remove useAuth hook as requested
 const { user, logOut } = useContext(AuthContext);
 console.log('hey',user)
 
  const [isOpen, setIsOpen] = useState(false);
  
  // Define a placeholder for user state to control visibility of links
 // Set to null (logged out) or an object (logged in) for testing

 

  return (
  <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 '>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            {/* Logo Text Link (no image) */}
            <Link href='/' className='text-xl font-bold text-gray-800'>
              RecipeSpot
            </Link>
            
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  {/* Placeholder for avatar section - using simple text */}
                 
                  
                  
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[150px]  bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      href='/'
                      className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'

                    >
                      Home
                    </Link>
                    <Link
                      href='/recipes'
                      className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'

                    >
                     Recipes
                    </Link>
                    <Link
                      href='/add-recipe'
                      className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'

                    >
                     Add Recipe
                    </Link>

                    {user ? (
                      <>
                        <Link
                          href='/details'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Details
                        </Link>
                        <div
                          // Removed logOut function
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                          onClick={() => { setIsOpen(false); /* handle logout logic here if needed */ }}
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href='/register'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
