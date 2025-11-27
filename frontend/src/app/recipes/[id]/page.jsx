// src/app/recipes/[id]/page.jsx

import React from 'react';
import Image from 'next/image';
import { Clock, Utensils, Users, BookOpen } from 'lucide-react';

// --- DATA FETCHING FUNCTION ---
async function getRecipeDetails(id) {
    // NOTE: Replace 'http://localhost:5000' with your actual deployed backend URL 
    // or internal API route in a production environment.
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/recipes/${id}`; 
    
    try {
        const response = await fetch(apiUrl, {
            // Optional: Revalidate data every 60 seconds (or 0 for no caching)
            next: { revalidate: 60 } 
        });

        if (!response.ok) {
            // This error will be caught by the catch block
            throw new Error(`Failed to fetch recipe details: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return null; // Return null or handle the error in the component
    }
}
// ------------------------------


export default async function RecipeDetailsPage({ params }) {
    const { id } =await params;
    const recipe = await getRecipeDetails(id);

    if (!recipe) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center text-2xl font-semibold">
                Recipe not found or an error occurred.
            </div>
        );
    }
    
    // Destructure data for easier use
    const { 
        name, 
        description, 
        cookTime, 
        image, // This holds the image URL
        // Assuming 'prepTime', 'serving', and 'serveSize' are also available or need to be derived
        // If not available, we use default/placeholder values
        prepTime = "N/A", 
        serving = "N/A",
        serveSize = "N/A"
    } = recipe;


    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            
            {/* Title Section (Optional, but good for context) */}
            <div className="bg-red-400 rounded-3xl text-white py-4 sm:py-5 md:py-6 text-center mb-8">
                <h1 className="text-xl md:text-3xl font-extrabold leading-tight">
                    {name}
                </h1>
            </div>

            {/* Recipe Card Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                
                {/* Image Section */}
                <div className="relative w-full h-80 sm:h-96">
                    <Image
                        src={image}
                        alt={`Image of ${name}`}
                        fill // Fills the parent div
                        priority // Prioritize loading for LCP
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 600px"
                    />
                </div>

                {/* Metadata/Info Bar (Responsive) */}
                <div className="flex flex-wrap justify-around bg-white text-gray-700 py-3 sm:py-4 border-b border-gray-100">
                    
                    {/* Prep Time */}
                    <div className="flex items-center gap-2 p-3 sm:p-0">
                        <Clock className="w-5 h-5 text-red-500" />
                        <div className="text-sm sm:text-base">
                            <span className="font-semibold">Prep Time</span>
                            <br className="sm:hidden" />
                            <span className="ml-1 sm:ml-0 block sm:inline">{prepTime}</span>
                        </div>
                    </div>

                    {/* Cook Time */}
                    <div className="flex items-center gap-2 p-3 sm:p-0 border-l sm:border-l border-gray-200 sm:pl-8">
                        <Utensils className="w-5 h-5 text-red-500" />
                        <div className="text-sm sm:text-base">
                            <span className="font-semibold">Cook Time</span>
                            <br className="sm:hidden" />
                            <span className="ml-1 sm:ml-0 block sm:inline">{cookTime}</span>
                        </div>
                    </div>

                    {/* Serving */}
                    <div className="flex items-center gap-2 p-3 sm:p-0 border-l sm:border-l border-gray-200 sm:pl-8">
                        <Users className="w-5 h-5 text-red-500" />
                        <div className="text-sm sm:text-base">
                            <span className="font-semibold">Serving</span>
                            <br className="sm:hidden" />
                            <span className="ml-1 sm:ml-0 block sm:inline">{serving}</span>
                        </div>
                    </div>

                    {/* Serve Size */}
                    <div className="flex items-center gap-2 p-3 sm:p-0 border-l sm:border-l border-gray-200 sm:pl-8">
                        <BookOpen className="w-5 h-5 text-red-500" />
                        <div className="text-sm sm:text-base">
                            <span className="font-semibold">Serve Size</span>
                            <br className="sm:hidden" />
                            <span className="ml-1 sm:ml-0 block sm:inline">{serveSize}</span>
                        </div>
                    </div>
                </div>

                {/* Description/Body Section */}
                <div className="p-4 sm:p-6 md:p-8 text-gray-800 leading-relaxed">
                    <p className="whitespace-pre-wrap">{description}</p>
                </div>

            </div>
        </div>
    );
}