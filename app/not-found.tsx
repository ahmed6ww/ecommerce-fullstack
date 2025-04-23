'use client';

import Link from 'next/link';
import { Suspense } from 'react';

// Separate this component to isolate any hooks that need Suspense
function HomeLink() {
  return (
    <Link 
      href="/" 
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
    >
      Return to Home
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>}>
          <HomeLink />
        </Suspense>
      </div>
    </div>
  );
}