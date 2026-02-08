// src/services/api.ts

// Base API service with authentication
class ApiService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  }

  // Helper method to get the authorization header
  private getAuthHeader(): { [key: string]: string } {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Generic request method
  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Try to get error message from response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (e) {
          // If we can't parse the error body, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      // For DELETE requests, return success message instead of JSON
      if (config.method === 'DELETE') {
        return { message: 'Successfully deleted' } as T;
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(username: string, password: string): Promise<{ access_token: string, token_type: string }> {
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

  async register(userData: { username: string, email: string, password: string }): Promise<any> {
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

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
  }

  async getProfile(): Promise<any> {
    return this.request('/api/v1/auth/users/me');
  }

  // Task-related methods
  async getTasks(): Promise<any[]> {
    return this.request('/api/v1/tasks');
  }

  async getTask(id: number): Promise<any> {
    return this.request(`/api/v1/tasks/${id}`);
  }

  async createTask(taskData: any): Promise<any> {
    return this.request('/api/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: number, taskData: any): Promise<any> {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: number): Promise<any> {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard-related methods
  async getDashboardData(): Promise<any> {
    return this.request('/api/v1/dashboard');
  }

  // Agent-related methods (placeholder - would need actual backend implementation)
  async getAgentStatus(): Promise<any> {
    return this.request('/api/v1/agent/status');
  }

  async sendMessageToAgent(message: string): Promise<any> {
    return this.request('/api/v1/agent/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export const apiService = new ApiService();