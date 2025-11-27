"use client";
import { CgMoreR } from "react-icons/cg";

import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
export default function Card({ recipe }) {
    if (!recipe) return null;
    console.log(recipe)
    const {
        _id,
        name = "Unknown Name",
        category = "Unknown Category",
        quantity
        ,
        price = 0,
        description,
        cookTime,


        image
    } = recipe;

    return (
        <Link
            //   href={`/recipe/${_id}`}
            href={`/recipes`}
            className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className=" aspect-square w-full relative overflow-hidden rounded-xl"
                >
                    <Image className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={image}
                        width={500}
                        height={500}
                        alt="Plant Image"
                    />
                    <div className="absolute top-3 right-3 "></div>
                </div>
                <div className="font-semibold text-sm  text-center text-orange-600"> {category}</div>
                <div className="font-bold text-lg bg-amber-500 text-center text-gray-700 rounded-xl"> {name}</div>

                <div className="font-semibold text-sm">Quantity: {quantity}</div>
                <div className="flex flex-row items-center gap-1">
                 <div className=" flex justify-center gap-2 items-center" > 
                    <p>View Details</p>
                    <CgMoreR />
                 </div>
                </div>
            </div>
        </Link>
    );
};

