'use client';

import { useState } from 'react';
import { apiService } from '../../src/services/api';

interface TodoFormProps {
  onAddTodo?: (title: string, description?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await apiService.createTask({ title, description, completed: false });
        setTitle('');
        setDescription('');
        setError(null);
        // Optionally trigger a refresh of the todo list
        if (onAddTodo) {
          onAddTodo(title, description);
        }
      } catch (err) {
        setError('Failed to add todo. Please try again.');
        console.error('Error adding todo:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
          <span>{error}</span>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Add Todo
      </button>
    </form>
  );
}