
"use client"; // This component needs to be a Client Component
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SloganBanner from "../../components/Slogan";

// Define your slide content
const slides = [
  {
    image: "https://i.ibb.co.com/rRkz8Bxd/ranna-wordpress-theme-radiustheme-com-4-1240x578.jpg", // Ensure these paths are correct in public/images
    heading: "Discover Your Next Favorite Meal.",
    subheading:
      "A vibrant community for home cooks to share and save delicious, tested recipes from around the world.",
    cta: "Browse All Recipes",
    link: "/recipes",
  },
  {
    image: "https://i.ibb.co.com/gLprJhMb/ranna-wordpress-theme-radiustheme-com-9-1240x578.jpg",
    heading: "Unleash Your Inner Chef.",
    subheading:
      "From quick weeknight dinners to gourmet feasts, find inspiration for every occasion.",
    cta: "Explore Categories",
    link: "/recipes", // Could link to a categories page if you build one
  },
  {
    image: "https://i.ibb.co.com/gbfhWT9R/ranna-wordpress-theme-radiustheme-com-11.jpg",
    heading: "Share Your Culinary Masterpieces.",
    subheading:
      "Upload your own unique recipes and connect with a passionate global cooking community.",
    cta: "Add Your Recipe",
    link: "/add-recipe",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simple animation for text (you could use a more advanced library like Framer Motion for complex animations)
  const textAnimation = "transition-all duration-700 ease-out transform";
  return (
    <div>
      <SloganBanner></SloganBanner>
      
      <section className="relative h-screen-75 md:h-screen-80 lg:h-screen-90 overflow-hidden">
      <Carousel
        showArrows={false} // Hide navigation arrows
        showStatus={false} // Hide current slide status (e.g., "1 of 3")
        showIndicators={true} // Show bottom dots for navigation
        showThumbs={false} // Hide thumbnail navigation
        infiniteLoop={true} // Loop indefinitely
        autoPlay={true} // Auto-advance slides
        interval={5000} // 5 seconds per slide
        transitionTime={700} // Transition duration
        stopOnHover={true} // Pause on hover
        onChange={(index) => setCurrentSlide(index)} // Update current slide index for animation
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-full flex items-center justify-center"
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              className="object-cover" // Ensures image covers the div without distorting
              priority={index === 0} // Prioritize loading for the first image
            />

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content Container */}
            <div
              className={`relative z-10 max-w-4xl mx-auto p-6 text-center text-white 
                          ${
                            currentSlide === index
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-10"
                          } 
                          ${textAnimation}`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-red-500">
                {slide.heading}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
                {slide.subheading}
              </p>
              <Link
                href={slide.link}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out shadow-lg"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
    </div>
  );
}

