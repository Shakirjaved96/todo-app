'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '../../src/services/api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
  intent?: string;
}

export default function AgentConsole() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! I\'m your AI assistant. How can I help you today?', sender: 'agent', timestamp: new Date().toISOString() },
    { id: 2, text: 'Show me my pending tasks', sender: 'user', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 3, text: 'You have 3 pending tasks: "Complete project proposal", "Team meeting", and "Review documentation".', sender: 'agent', timestamp: new Date(Date.now() - 30000).toISOString() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [intentPreview, setIntentPreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Simple intent detection for preview
    if (value.toLowerCase().includes('add') || value.toLowerCase().includes('create')) {
      setIntentPreview(`Will create a new task: "${value.replace(/add|create/i, '').trim()}"`);
    } else if (value.toLowerCase().includes('complete') || value.toLowerCase().includes('done')) {
      setIntentPreview(`Will mark a task as complete`);
    } else if (value.toLowerCase().includes('delete') || value.toLowerCase().includes('remove')) {
      setIntentPreview(`Will delete a task`);
    } else if (value.toLowerCase().includes('show') || value.toLowerCase().includes('list')) {
      setIntentPreview(`Will show your tasks`);
    } else {
      setIntentPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIntentPreview(null);
    setIsLoading(true);

    try {
      // Simulate API call to AI agent
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add agent response
      const agentMessage: Message = {
        id: messages.length + 2,
        text: `I received your request: "${inputValue}". In a real implementation, I would process this using the OpenAI API.`,
        sender: 'agent',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'agent',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Agent Console</h1>
          <p className="text-gray-600 dark:text-gray-400">Interact with your intelligent task assistant</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">Online</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Natural Language Processing
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                    Task Management
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    Context Awareness
                  </span>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                {intentPreview && (
                  <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-blue-700 dark:text-blue-300 text-sm">{intentPreview}</span>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about your tasks..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className={`px-6 py-3 rounded-r-lg font-medium ${
                      isLoading || !inputValue.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Send
                  </button>
                </form>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Try: "Add a task to buy groceries", "Mark the report as complete", "Show me urgent tasks"
                </div>
              </div>
            </div>
          </div>

          {/* Context Panel */}
          <div className="space-y-6">
            {/* Current Tasks Snippet */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Complete project proposal</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">High priority</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Team meeting</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Medium priority</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Review documentation</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Low priority</p>
                  </div>
                </div>
              </div>
              <Link href="/authenticated/tasks" className="mt-4 block text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                View all tasks
              </Link>
            </div>

            {/* Agent Capabilities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Agent Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Create new tasks</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Update task status</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Set task priorities</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Schedule reminders</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Natural language processing</span>
                </li>
              </ul>
            </div>

            {/* Voice Input Button */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-center">
              <button className="flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition duration-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              <p className="mt-3 text-white text-sm">Click and speak to interact with the AI assistant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}