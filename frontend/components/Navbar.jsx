"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GiCook, GiFlame } from 'react-icons/gi';
import Container from "./Container";
import { AuthContext } from "@/context/AuthContext";
const avatarImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Navbar() {
  // We remove useAuth hook as requested
  const { user, logOut } = useContext(AuthContext);
  console.log("hey", user);

  const [isOpen, setIsOpen] = useState(false);

  // Define a placeholder for user state to control visibility of links
  // Set to null (logged out) or an object (logged in) for testing

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo Text Link (no image) */}
           <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.03]">
      {/* 1. Icon: Use the red theme color for the icon */}
      <GiCook className="text-3xl text-red-500" aria-label="Chef Hat Icon" />
      
      {/* 2. Brand Name */}
      <div className="text-2xl font-extrabold tracking-tight">
        {/* 'Recipe' in strong gray/black */}
        <span className="text-gray-900">Recipe</span>
        
        {/* 'Spot' in your red theme color */}
        <span className="text-red-500">Spot</span>
      </div>
    </Link>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[150px]  bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      href="/"
                      className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>
                    <Link
                      href="/recipes"
                      className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Recipes
                    </Link>
                    <Link
                      href="/add-recipe"
                      className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Add Recipe
                    </Link>

                    {user ? (
                      <>
                        <Link
                          href="/details"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          onClick={() => setIsOpen(false)}
                        >
                          Details
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
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
