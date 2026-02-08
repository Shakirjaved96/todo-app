'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (in a real app, you would check for a valid token)
    const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('access_token');

    if (isAuthenticated) {
      router.push('/authenticated/dashboard');
    } else {
      router.push('/landing'); // Redirect to landing page if not authenticated
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}