// frontend/components/SloganBanner.jsx
'use client'; // This component uses useState and useEffect for animation

import { useEffect, useState } from 'react';

export default function SloganBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // 200ms delay to ensure it's rendered before animating

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    // Centered container with padding and your red theme background
    <div 
      className={`bg-red-500 text-white py-4 sm:py-5 md:py-6 text-center 
                  transition-all duration-1000 ease-out 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      role="banner" // Semantic role for accessibility
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Main part of the slogan in bold, larger text */}
        <h2 className="text-xl  md:text-3xl font-extrabold leading-tight">
          RecipeSpot: 
          {/* Subtler, slightly smaller text for the descriptive part */}
          <span className="text-lg md:text-3xl font-semibold ml-2">Discover Your Next Favorite Meal.</span>
        </h2>
      </div>
    </div>
  );
}