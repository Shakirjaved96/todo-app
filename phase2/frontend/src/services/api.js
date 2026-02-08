// src/services/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem('access_token');
    
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle different response types
      if (!response.ok) {
        // Attempt to get error message from response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorBody = await response.json();
          if (errorBody.detail) {
            errorMessage = errorBody.detail;
          }
        } catch (e) {
          // If we can't parse the error body, use the status text
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      // For DELETE requests, return success message instead of JSON
      if (config.method === 'DELETE') {
        return { message: 'Successfully deleted' };
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${this.baseUrl}/api/v1/auth/token`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  async register(userData) {
    const response = await fetch(`${this.baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    return await response.json();
  }

  async logout() {
    localStorage.removeItem('access_token');
  }

  async getProfile() {
    return this.request('/api/v1/auth/users/me');
  }

  // Task-related methods
  async getTasks() {
    return this.request('/api/v1/tasks');
  }

  async getTask(id) {
    return this.request(`/api/v1/tasks/${id}`);
  }

  async createTask(taskData) {
    return this.request('/api/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id, taskData) {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id) {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();