"use client"; // Important: This component needs to be a Client Component

import React, { useState, useEffect } from 'react';
import Container from './Container';
import Card from './Card';

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('http://localhost:5000/recipes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (e) {
        console.error("Fetching recipes failed:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, []); // The empty array ensures this runs only once after initial render

  if (isLoading) {
    return (
      <Container>
        <div className="pt-12 text-center text-xl">Loading recipes...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="pt-12 text-center text-xl text-red-500">Error fetching data: {error}</div>
      </Container>
    );
  }

  return (
    <Container>
      {recipes && recipes.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {recipes.map((recipe) => (
            // Prop Drilling: Pass the recipe data as a prop
            <Card key={recipe._id} recipe={recipe} /> 
          ))}
        </div>
      ) : (
        <div className="pt-12 text-center text-xl">No recipes found.</div>
      )}
    </Container>
  );
}