// src/app/(auth)/register/page.jsx
import React, { Suspense } from "react";
import RegisterContent from "./register";


// Fallback component for Suspense
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <p>Loading registration form...</p>
    </div>
  );
}

// This is the default Export for the page route
export default function Register() {
  return (
    // Wrap the client component in Suspense to prevent the prerendering error
    <Suspense fallback={<LoadingFallback />}>
      <RegisterContent />
    </Suspense>
  );
}
