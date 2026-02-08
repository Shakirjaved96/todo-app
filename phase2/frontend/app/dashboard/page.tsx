'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '../../src/services/api';
import Sidebar from '../components/Sidebar';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'in-progress' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  user_id: number;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the dashboard API
      // const data = await apiService.getDashboardData();
      // For now, we'll simulate data
      const mockTasks: Task[] = [
        { id: 1, title: 'Complete project proposal', description: 'Finish the project proposal for client review', status: 'in-progress', priority: 'high', created_at: '2026-02-01T10:00:00Z', updated_at: '2026-02-05T14:30:00Z', user_id: 1 },
        { id: 2, title: 'Team meeting', description: 'Weekly team sync meeting', status: 'pending', priority: 'medium', created_at: '2026-02-02T09:00:00Z', updated_at: '2026-02-02T09:00:00Z', user_id: 1 },
        { id: 3, title: 'Review documentation', description: 'Review and update API documentation', status: 'pending', priority: 'low', created_at: '2026-02-03T11:00:00Z', updated_at: '2026-02-03T11:00:00Z', user_id: 1 },
        { id: 4, title: 'Fix critical bug', description: 'Resolve the authentication issue reported by users', status: 'blocked', priority: 'high', created_at: '2026-02-04T15:00:00Z', updated_at: '2026-02-06T10:00:00Z', user_id: 1 },
      ];
      setTasks(mockTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => {
    // In a real implementation, we would check due dates
    return false;
  }).length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
              </header>

              {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Tasks</h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalTasks}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</h3>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{completedTasks}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Overdue</h3>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{overdueTasks}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Agent Status</h3>
                      <div className="flex items-center mt-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-green-600 dark:text-green-400 font-medium">Online</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Add Task Bar */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Add Task</h2>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="What do you need to do?"
                        className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-r-lg transition duration-200">
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Recent Tasks */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
                      <Link href="/tasks" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        View All
                      </Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {tasks.slice(0, 5).map((task) => (
                            <tr key={task.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                                  {task.description && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{task.description}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                  task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                  task.status === 'blocked' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                                  'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                }`}>
                                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                  'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                }`}>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Agent Activity Visualization */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Agent Activity</h2>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                      <div className="inline-block relative">
                        {/* Agent Pulse Visualizer */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-bold">AI</span>
                            </div>
                          </div>
                        </div>
                        {/* Animation elements */}
                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-20"></div>
                      </div>
                      <p className="mt-4 text-gray-600 dark:text-gray-300">Real-time agent activity visualization</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current status: Processing 3 tasks</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}