# TodoAI Frontend

This is the frontend for the TodoAI application, built with Next.js and TypeScript. It provides a complete user interface for managing tasks with AI assistance.

## Features

- **Dashboard**: Overview of tasks with statistics and quick actions
- **Task Manager**: Full CRUD operations for tasks with filtering and sorting
- **AI Agent Console**: Natural language interaction with AI assistant
- **Settings**: User preferences and AI agent configuration
- **Authentication**: Login and signup pages
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Automatic theme switching

## Pages

- `/` - Landing page with feature highlights
- `/dashboard` - Dashboard with task overview and statistics
- `/tasks` - Task management interface with filtering and sorting
- `/agent` - AI agent console for natural language interaction
- `/settings` - User settings and AI agent configuration
- `/login` - User login page
- `/signup` - User registration page

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Inline SVG icons
- **State Management**: React Hooks

## Architecture

The application follows a component-based architecture:

- `app/` - Contains all page routes and layouts
- `app/components/` - Reusable UI components (e.g., Sidebar)
- `src/services/` - API service for backend communication

## API Integration

The frontend communicates with the backend API through the service layer in `src/services/api.js`. All API calls follow the contract specified in the backend documentation.

## Styling

The application uses Tailwind CSS for styling with a consistent color scheme:
- Primary: Blue (`blue-600`, `blue-500`)
- Secondary: Indigo/Purple gradients
- Semantic colors for status indicators (red for errors, green for success, etc.)

## Responsive Design

The interface is fully responsive and adapts to different screen sizes:
- Mobile: Single column layout with collapsible sidebar
- Tablet: Optimized two-column layouts
- Desktop: Full sidebar and multi-column layouts

## Dark Mode

The application supports both light and dark themes, automatically adapting to the user's system preference. All components are styled to work in both modes.

## AI Agent Integration

The AI agent console provides:
- Natural language processing for task management
- Intent preview showing what action will be taken
- Context awareness of current tasks
- Voice input capability

## Setup

1. Install dependencies: `npm install`
2. Set environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
3. Run the development server: `npm run dev`

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Base URL for the backend API

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter

## Deployment

The application is ready for deployment to platforms like Vercel, Netlify, or any hosting service that supports Next.js applications.