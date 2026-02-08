'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiService } from '../../src/services/api';
import Sidebar from '../components/Sidebar';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software engineer passionate about productivity tools',
    agentPersonality: 'professional', // 'casual' or 'professional'
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    agentSettings: {
      scheduler: true,
      priority: true,
      reminder: false,
    },
    calendarIntegration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name.includes('.')) {
        // Nested object property
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: target.checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: target.checked
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real implementation, this would call the settings API
      // const response = await apiService.updateSettings(formData);
      console.log('Updating settings:', formData);
      
      // Show success message
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
              </header>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex -mb-px">
                    {['profile', 'notifications', 'agents', 'integrations'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-6 text-center font-medium text-sm ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          ></textarea>
                        </div>
                        
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Profile Picture
                          </label>
                          <div className="flex items-center">
                            <div className="mr-4">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            </div>
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition duration-200"
                            >
                              Change
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="notifications.email"
                                checked={formData.notifications.email}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your devices</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="notifications.push"
                                checked={formData.notifications.push}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="notifications.sms"
                                checked={formData.notifications.sms}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'agents' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Agent Settings</h2>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Scheduler Agent</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically schedule recurring tasks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="agentSettings.scheduler"
                                checked={formData.agentSettings.scheduler}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Priority Agent</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically assign priorities to tasks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="agentSettings.priority"
                                checked={formData.agentSettings.priority}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Reminder Agent</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Send timely reminders for upcoming tasks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="agentSettings.reminder"
                                checked={formData.agentSettings.reminder}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Agent Personality</h3>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="agentPersonality"
                                value="casual"
                                checked={formData.agentPersonality === 'casual'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Casual</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="agentPersonality"
                                value="professional"
                                checked={formData.agentPersonality === 'professional'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Professional</span>
                            </label>
                          </div>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {formData.agentPersonality === 'casual' 
                              ? 'AI agents will use informal language and friendly tone.' 
                              : 'AI agents will use formal language and professional tone.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'integrations' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Calendar Integration</h2>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Google Calendar</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Sync your tasks with Google Calendar</p>
                            </div>
                            <button
                              type="button"
                              className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
                            >
                              {formData.calendarIntegration ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            {formData.calendarIntegration 
                              ? 'Connected to john.doe@gmail.com' 
                              : 'Connect your Google Calendar to automatically schedule tasks and receive reminders.'}
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Slack</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Receive task notifications in Slack</p>
                            </div>
                            <button
                              type="button"
                              className="ml-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded-lg transition duration-200"
                            >
                              Coming Soon
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Microsoft Teams</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Integrate with Microsoft Teams</p>
                            </div>
                            <button
                              type="button"
                              className="ml-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded-lg transition duration-200"
                            >
                              Coming Soon
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}