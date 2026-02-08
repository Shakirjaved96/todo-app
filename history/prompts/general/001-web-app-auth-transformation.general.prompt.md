---
id: 001
title: "Web App Auth Transformation"
stage: "spec"
date_iso: "2026-02-07"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "002-web-app-auth"
user: "Admin"
command: "/sp.specify Phase II: Todo Full-Stack Web Application..."
labels:
  - "specification"
  - "authentication"
  - "web-application"
  - "api-design"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "specs/002-web-app-auth/spec.md"
  - "specs/002-web-app-auth/checklists/requirements.md"
  - "history/prompts/general/001-web-app-auth-transformation.general.prompt.md"
tests_yaml:
  - "specification validation completed"
  - "quality checklist created and validated"
outcome: "Specification created successfully for Phase II Todo Full-Stack Web Application with authentication, REST API endpoints, and user isolation."
evaluation: "Successfully transformed user requirements into a comprehensive specification with user stories, functional requirements, and success criteria."
---

# Web App Auth Transformation

## User Input
```
Phase II: Todo Full-Stack Web Application
Basic Level Functionality
Objective: Using Claude Code and Spec-Kit Plus transform the console app into a modern multi-user web application with persistent storage.
💡Development Approach: Use the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via Claude Code. No manual coding allowed. We will review the process, and iterations to judge each phase and project.
Requirements
Implement all 5 Basic Level features as a web application
Create RESTful API endpoints
Build responsive frontend interface
Store data in Neon Serverless PostgreSQL database
Authentication – Implement user signup/signin using Better Auth
Technology Stack
Layer
Technology
Frontend
Next.js 16+ (App Router)
Backend
Python FastAPI
ORM
SQLModel
Database
Neon Serverless PostgreSQL
Spec-Driven
Claude Code + Spec-Kit Plus
Authentication
Better Auth

API Endpoints
Method
Endpoint
Description
GET
/api/{user_id}/tasks
List all tasks
POST
/api/{user_id}/tasks
Create a new task
GET
/api/{user_id}/tasks/{id}
Get task details
PUT
/api/{user_id}/tasks/{id}
Update a task
DELETE
/api/{user_id}tasks/{id}
Delete a task
PATCH
/api/{user_id}tasks/{id}/complete
Toggle completion


Securing the REST API
Better Auth + FastAPI Integration
The Challenge
Better Auth is a JavaScript/TypeScript authentication library that runs on your Next.js frontend. However, your FastAPI backend is a separate Python service that needs to verify which user is making API requests.
The Solution: JWT Tokens
Better Auth can be configured to issue JWT (JSON Web Token) tokens when users log in. These tokens are self-contained credentials that include user information and can be verified by any service that knows the secret key.
How It Works
User logs in on Frontend → Better Auth creates a session and issues a JWT token
Frontend makes API call → Includes the JWT token in the Authorization: Bearer <token> header
Backend receives request → Extracts token from header, verifies signature using shared secret
Backend identifies user → Decodes token to get user ID, email, etc. and matches it with the user ID in the URL
Backend filters data → Returns only tasks belonging to that user
What Needs to Change
Component
Changes Required
Better Auth Config
Enable JWT plugin to issue tokens
Frontend API Client
Attach JWT token to every API request header
FastAPI Backend
Add middleware to verify JWT and extract user
API Routes
Filter all queries by the authenticated user's ID

The Shared Secret
Both frontend (Better Auth) and backend (FastAPI) must use the same secret key for JWT signing and verification. This is typically set via environment variable BETTER_AUTH_SECRET in both services.
Security Benefits
Benefit
Description
User Isolation
Each user only sees their own tasks
Stateless Auth
Backend doesn't Project overview
│   ├── architecture.md           # System architecture
│   ├── features/                 # Feature specifications
│   │   ├── task-crud.md
│   │   ├── authentication.md
│   │   └── chatbot.md
│   ├── api/                      # API specifications
│   │   ├── rest-endpoints.md
│   │   └── mcp-tools.md
│   ├── database/                 # Database specifications
│   │   └── schema.md
│   └── ui/                       # UI specifications
│       ├── components.md
│       └── pages.md
├── CLAUDE.md                     # Root Claude Code instructions
├── frontend/
│   ├── CLAUDE.md
│   └── ... (Next.js app)
├── backend/
│   ├── CLAUDE.md
│   └── ... (FastAPI app)
├── docker-compose.yml
└── README.md
Key Differences from Basic Monorepo
Aspect
Without Spec-Kit
With Spec-Kit
Specs Location
/specs (flat)
/specs (organized by type)
Config File
None
/.spec-kit/config.yaml
Spec Format
Freeform markdown
Spec-Kit conventions
Referencing
@specs/file.md
@specs/features/file.md

Spec-Kit Config File
# .spec-kit/config.yaml
name: hackathon-todo
version: "1.0"

structure:
  specs_dir: specs
  features_dir: specs/features
  api_dir: specs/api
  database_dir: specs/database
  ui_dir: specs/ui

phases:
  - name: phase1-console
    features: [task-crud]
  - name: phase2-web
    features: [task-crud, authentication]
  - name: phase3-chatbot
    features: [task-crud, authentication, chatbot]

CLAUDE.md Files
Create multiple CLAUDE.md files to provide context at different levels:
Root CLAUDE.md
# Todo App - Hackathon II

## Project Overview
This is a monorepo using GitHub Spec-Kit for spec-driven development.

## Spec-Kit Structure
Specifications are organized in /specs:
- /sE.md
How to navigate and use specs
/frontend/CLAUDE.md
Frontend-specific patterns
/backend/CLAUDE.md
Backend-specific patterns

Key Point:
Spec-Kit Plus provides organized, structured specs that Claude Code can reference. The CLAUDE.md files tell Claude Code how to use those specs and project-specific conventions.

Summary: Monorepo vs Separate Repos
Approach
Pros
Cons
Monorepo ⭐
Single CLAUDE.md context, easier cross-cutting changes
Larger repo
Separate Repos
Clear separation, independent deployments
Claude Code needs workspace setup

Recommendation:
Use monorepo for the hackathon – simpler for Claude Code to navigate and edit both frontend and backend in a single context.
Key Benefits of This Structure
Benefit
Description
Single Context
Claude Code sees entire project, can make cross-cutting changes
Layered CLAUDE.md
Root file for overview, subfolder files for specific guidelines
Specs Folder
Reference specifications directly with @specs/filename.md
Clear Separation
Frontend and backend code in separate folders, easy to navigate
```

## Response Summary
Created a comprehensive specification for the Phase II Todo Full-Stack Web Application based on user requirements. The specification includes:

- Three prioritized user stories focusing on authentication, task management, and secure API access
- Ten functional requirements covering registration, authentication, API endpoints, data storage, and user isolation
- Key entities: User, Task, and JWT Token
- Six measurable success criteria for user experience, performance, and security

The specification follows the template structure and is ready for the planning phase. A quality checklist was also created and validated.

## Files Created/Modified
- specs/002-web-app-auth/spec.md: Main specification document
- specs/002-web-app-auth/checklists/requirements.md: Quality validation checklist
- history/prompts/general/001-web-app-auth-transformation.general.prompt.md: This PHR record