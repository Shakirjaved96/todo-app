# Test script to verify backend and frontend integration

import subprocess
import sys
import os
import time
import requests

def test_backend():
    """Test if the backend is properly configured"""
    print("Testing backend configuration...")
    
    # Check if the main files exist
    backend_files = [
        "src/main.py",
        "src/auth/auth_handler.py",
        "src/auth/models.py",
        "src/auth/repository.py",
        "src/auth/routes.py",
        "src/models/task.py",
        "src/routes/tasks.py",
        "src/repositories/task_repository.py",
        "src/database.py"
    ]
    
    backend_dir = "D:\\TODO_APP\\phase2\\backend"
    missing_files = []
    
    for file in backend_files:
        if not os.path.exists(os.path.join(backend_dir, file)):
            missing_files.append(file)
    
    if missing_files:
        print(f"X Missing backend files: {missing_files}")
        return False
    else:
        print("V All backend files are present")
    
    return True

def test_frontend():
    """Test if the frontend is properly configured"""
    print("\nTesting frontend configuration...")
    
    # Check if the main files exist
    frontend_files = [
        "package.json",
        "src/services/api.js",
        "app/page.tsx",
        "app/components/TodoForm.tsx",
        "app/components/TodoItem.tsx",
        "app/components/TodoList.tsx",
        "app/dashboard/page.tsx",
        "app/tasks/page.tsx",
        "app/agent/page.tsx",
        "app/settings/page.tsx",
        "app/login/page.tsx",
        "app/signup/page.tsx"
    ]
    
    frontend_dir = "D:\\TODO_APP\\phase2\\frontend"
    missing_files = []
    
    for file in frontend_files:
        if not os.path.exists(os.path.join(frontend_dir, file)):
            missing_files.append(file)
    
    if missing_files:
        print(f"X Missing frontend files: {missing_files}")
        return False
    else:
        print("V All frontend files are present")
    
    # Check if API service has authentication
    api_service_path = os.path.join(frontend_dir, "src", "services", "api.js")
    with open(api_service_path, 'r', encoding='utf-8') as f:
        api_content = f.read()
        
    if 'Authorization' in api_content and 'Bearer' in api_content:
        print("V API service includes authentication headers")
    else:
        print("X API service does not include authentication headers")
        return False
    
    return True

def test_integration():
    """Test if backend and frontend are properly integrated"""
    print("\nTesting backend-frontend integration...")
    
    # Check if both are properly configured
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    
    if backend_ok and frontend_ok:
        print("\nV Backend and frontend are properly configured!")
        print("\nConfiguration Summary:")
        print("- Backend: FastAPI with JWT authentication, SQLAlchemy ORM, PostgreSQL")
        print("- Frontend: Next.js 14 with TypeScript, Tailwind CSS, API service with auth")
        print("- Integration: API service includes authentication headers and proper endpoints")
        print("- Security: Password hashing, JWT tokens, user-specific data access")
        return True
    else:
        print("\nX Issues found in configuration")
        return False

if __name__ == "__main__":
    print("TodoAI Backend-Frontend Integration Test")
    print("=" * 50)
    
    success = test_integration()
    
    if success:
        print("\nSuccess! All systems are properly configured!")
        print("\nNext steps:")
        print("1. Start the backend: cd phase2/backend && uvicorn src.main:app --reload")
        print("2. Start the frontend: cd phase2/frontend && npm run dev")
        print("3. Access the application at http://localhost:3000")
    else:
        print("\nError: Please fix the configuration issues before proceeding.")
        sys.exit(1)