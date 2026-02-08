'use client';

import { useState, useEffect } from 'react';
import { apiService } from '../../src/services/api';

export default function IntegrationTest() {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [backendHealth, setBackendHealth] = useState<boolean | null>(null);
  const [tasksCount, setTasksCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkIntegration();
  }, []);

  const checkIntegration = async () => {
    try {
      // Test backend health endpoint
      const healthResponse = await fetch('http://127.0.0.1:8000/health');
      const healthData = await healthResponse.json();

      if (healthData.status === 'healthy') {
        setBackendHealth(true);
        setStatus('Backend is healthy and accessible');
      } else {
        setBackendHealth(false);
        setStatus('Backend is running but not healthy');
      }

      // Try to get tasks (this will fail without auth, which is expected)
      try {
        const tasks = await apiService.getTasks();
        setTasksCount(tasks.length);
        setStatus('Frontend can communicate with backend API');
      } catch (tasksError: any) {
        if (tasksError.message.includes('401') || tasksError.message.includes('Unauthorized')) {
          setStatus('Frontend can communicate with backend (received expected auth error)');
        } else {
          throw tasksError;
        }
      }
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
      setStatus('Could not connect to backend');
      console.error('Integration test failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Integration Test</h1>
          
          <div className="mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              backendHealth === null ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
              backendHealth ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                backendHealth === null ? 'bg-yellow-500' :
                backendHealth ? 'bg-green-500 animate-pulse' :
                'bg-red-500'
              }`}></span>
              {status}
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Backend Connection</h3>
              <p className="text-3xl font-bold">
                {backendHealth === null ? '?' : 
                 backendHealth ? '✓' : '✗'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {backendHealth === null ? 'Checking...' : 
                 backendHealth ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Task Retrieval</h3>
              <p className="text-3xl font-bold">
                {tasksCount === null ? '?' : tasksCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {tasksCount === null ? 'Testing...' : 'Tasks retrieved'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">API Endpoints</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
              <li>• Health check: GET /health</li>
              <li>• Tasks: GET/POST/PUT/DELETE /api/v1/tasks</li>
              <li>• Authentication: POST /api/v1/auth/token</li>
              <li>• Registration: POST /api/v1/auth/register</li>
            </ul>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 text-left">
            <p>Backend URL: http://127.0.0.1:8000</p>
            <p>Frontend running on: http://localhost:3000</p>
          </div>
        </div>
      </div>
    </div>
  );
}