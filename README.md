# Task Management Dashboard

A Kanban-style task management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- View tasks in a Kanban-style board with three columns: To Do, In Progress, and Done
- Create new tasks with a title, description, and status
- Drag and drop tasks between columns to update their status
- API integration for persistence

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- react-beautiful-dnd for drag and drop functionality
- Axios for API calls
- Headless UI for accessible modal components

## Project Structure

```
src/
├── api/              # API integration
├── components/       # React components
├── context/          # React context for global state
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── App.tsx           # Root component
└── index.tsx         # Entry point
```

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/RutikKulkarni/Task-Management-Dashboard.git
   cd Task-Management-Dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```
