'use client';

import { useState, useEffect, useCallback } from 'react';
import TodoItem from './TodoItem';
import { apiService } from '../../src/services/api';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getTasks();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await apiService.updateTask(id, { ...todo, completed: !todo.completed });
      setTodos(prevTodos => prevTodos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await apiService.deleteTask(id);
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Todos</h2>
      {todos.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-gray-500 dark:text-gray-400">No todos yet. Add one above!</p>
        </div>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              user_id={todo.user_id}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}