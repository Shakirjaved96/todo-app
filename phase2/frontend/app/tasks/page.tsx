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
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  created_at: string;
  updated_at: string;
  user_id: number;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'priority') {
        const priorityOrder: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === 'status') {
        const statusOrder: Record<string, number> = { completed: 4, 'in-progress': 3, pending: 2, blocked: 1 };
        return statusOrder[b.status] - statusOrder[a.status];
      } else {
        // Default sort by created_at (newest first)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the tasks API
      // const data = await apiService.getTasks();
      // For now, we'll simulate data
      const mockTasks: Task[] = [
        { id: 1, title: 'Complete project proposal', description: 'Finish the project proposal for client review', status: 'in-progress', priority: 'high', tags: ['work', 'important'], created_at: '2026-02-01T10:00:00Z', updated_at: '2026-02-05T14:30:00Z', user_id: 1 },
        { id: 2, title: 'Team meeting', description: 'Weekly team sync meeting', status: 'pending', priority: 'medium', tags: ['meeting'], created_at: '2026-02-02T09:00:00Z', updated_at: '2026-02-02T09:00:00Z', user_id: 1 },
        { id: 3, title: 'Review documentation', description: 'Review and update API documentation', status: 'pending', priority: 'low', tags: ['documentation'], created_at: '2026-02-03T11:00:00Z', updated_at: '2026-02-03T11:00:00Z', user_id: 1 },
        { id: 4, title: 'Fix critical bug', description: 'Resolve the authentication issue reported by users', status: 'blocked', priority: 'urgent', tags: ['bug', 'critical'], created_at: '2026-02-04T15:00:00Z', updated_at: '2026-02-06T10:00:00Z', user_id: 1 },
        { id: 5, title: 'Prepare presentation', description: 'Prepare slides for the quarterly presentation', status: 'completed', priority: 'high', tags: ['presentation', 'work'], created_at: '2026-01-28T13:00:00Z', updated_at: '2026-02-01T16:00:00Z', user_id: 1 },
      ];
      setTasks(mockTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      // In a real implementation, this would call the API to update task status
      // const updatedTask = await apiService.updateTask(id, { status: newStatus });
      // For now, we'll update the local state
      setTasks(tasks.map(task => 
        task.id === id 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed', updated_at: new Date().toISOString() } 
          : task
      ));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error updating task status:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      // In a real implementation, this would call the API to delete the task
      // await apiService.deleteTask(id);
      // For now, we'll update the local state
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
                <p className="text-gray-600 dark:text-gray-400">Organize and manage your tasks efficiently</p>
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
                  {/* Search and Filter Bar */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Search
                        </label>
                        <input
                          type="text"
                          id="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search tasks..."
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="all">All</option>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="blocked">Blocked</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Priority
                        </label>
                        <select
                          id="priority"
                          value={priorityFilter}
                          onChange={(e) => setPriorityFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="all">All</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sort By
                        </label>
                        <select
                          id="sort"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="created_at">Newest First</option>
                          <option value="title">Title</option>
                          <option value="priority">Priority</option>
                          <option value="status">Status</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bulk Action Toolbar */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition duration-200">
                        Select All
                      </button>
                      <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition duration-200">
                        Export
                      </button>
                      <button className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-200 rounded-lg transition duration-200">
                        Delete Selected
                      </button>
                    </div>
                  </div>

                  {/* Task Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Task
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Priority
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Tags
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                              <tr 
                                key={task.id} 
                                className={`hover:bg-gray-50 dark:hover:bg-gray-750 ${task.priority === 'urgent' ? 'bg-red-50 dark:bg-red-900/20' : ''}`}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                      {task.title.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                                      {task.description && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{task.description}</div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    onClick={() => handleToggleStatus(task.id)}
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                                      task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                      task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                      task.status === 'blocked' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                                      'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                    }`}
                                  >
                                    {task.status.replace('-', ' ')}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    task.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                                    task.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                    'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                  }`}>
                                    {task.priority}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex flex-wrap gap-1">
                                    {task.tags?.map((tag, index) => (
                                      <span 
                                        key={index} 
                                        className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-3">
                                    <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                      Edit
                                    </Link>
                                    <button 
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center">
                                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                  </svg>
                                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No tasks found</h3>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Get started by creating a new task.
                                  </p>
                                  <div className="mt-6">
                                    <Link
                                      href="/tasks/new"
                                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Create new task
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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