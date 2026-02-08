'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, [pathname]); // Update when route changes

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  // Define navigation items
  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    ...(isAuthenticated 
      ? [
          { name: 'Dashboard', href: '/authenticated/dashboard', current: pathname === '/authenticated/dashboard' },
          { name: 'Tasks', href: '/authenticated/tasks', current: pathname === '/authenticated/tasks' },
          { name: 'AI Agent', href: '/authenticated/agent', current: pathname === '/authenticated/agent' },
        ] 
      : []
    ),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg"></div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TodoAI</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 dark:text-gray-300 dark:hover:border-gray-600'
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link 
                  href="/authenticated/settings" 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 mx-4"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 font-medium">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}