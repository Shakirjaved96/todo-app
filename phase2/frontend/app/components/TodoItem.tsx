'use client';

interface TodoItemProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  user_id: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ id, title, description, completed, user_id, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`p-4 mb-3 rounded-lg shadow flex items-start ${completed ? 'bg-green-50 dark:bg-green-900/30' : 'bg-white dark:bg-gray-800'}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-grow">
        <h3 className={`font-medium ${completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(id)}
        className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400"
        aria-label="Delete todo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}