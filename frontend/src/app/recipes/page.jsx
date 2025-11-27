import React from 'react'
import Recipe from '../../../components/Recipe'

export default function Recipes() {
  
  return (
     <div>
      <div className="max-w-4xl mx-auto px-4 bg-red-400 
      rounded-3xl text-white mt-5 py-4 sm:py-5 md:py-6 text-center ">
        <h2 className="text-xl  md:text-3xl font-extrabold leading-tight">
         All Recipes
        </h2>
        
      </div>
      <Recipe></Recipe>
    </div>
  )
}
