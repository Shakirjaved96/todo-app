'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg"></div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">TodoAI</span>
          </div>
          <div>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 font-medium mr-4">
              Log in
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
              <span className="block">Intelligent Task</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mt-2">
                Management
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Boost your productivity with AI-powered task management. Our intelligent agents help you organize, prioritize, and complete tasks faster than ever.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-200"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition duration-200"
              >
                Live demo
              </Link>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2">
              <div className="bg-gray-800 dark:bg-gray-900 rounded-t-xl p-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Task Management</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          Intelligent agents that understand natural language commands
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          Automatic task prioritization based on deadlines and importance
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          Smart scheduling and reminder systems
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg"></div>
                        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">Try our AI Agent</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <span className="text-blue-800 dark:text-blue-200 text-xs">AI</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Hello! I'm your AI assistant.</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">How can I help you manage your tasks today?</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-800 dark:text-gray-200 text-xs">JD</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Show me my urgent tasks</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <span className="text-blue-800 dark:text-blue-200 text-xs">AI</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">You have 2 urgent tasks:</p>
                            <ul className="mt-1 text-sm text-gray-500 dark:text-gray-400 list-disc pl-5 space-y-1">
                              <li>Complete project proposal (due today)</li>
                              <li>Fix authentication bug (reported as critical)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Features That Make You More Productive
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Our platform combines powerful task management with intelligent automation.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Smart Task Organization</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Automatically categorize and prioritize tasks based on deadlines, importance, and context.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI-Powered Insights</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Get intelligent recommendations on task prioritization and scheduling based on your habits and deadlines.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Secure & Private</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Your data is encrypted and stored securely. We never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to boost your productivity?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-200">
                Join thousands of users who are already transforming their task management with AI.
              </p>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition duration-200"
                >
                  Get started today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}