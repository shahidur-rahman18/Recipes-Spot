// src/app/(auth)/login/page.jsx
import React, { Suspense } from "react";
import LoginContent from "./login";


// Fallback component for Suspense (optional, but good practice)
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <p>Loading login form...</p>
    </div>
  );
}

// This page component is rendered on the server (by default)
export default function Login() {
  return (
    // Wrap the client component in Suspense.
    // This tells Next.js: "This part depends on client-side data (searchParams),
    // so defer its rendering until the client (browser) takes over."
    <Suspense fallback={<LoadingFallback />}>
      <LoginContent />
    </Suspense>
  );
}
