# Task Management Dashboard

A modern Kanban-style task management dashboard built with React, TypeScript, and Tailwind CSS.

- #### Live URL: [Task-Management-Dashboard](https://task-management-dashboard-mu.vercel.app/)

## Features

- **Kanban Board View**: View tasks in a three-column layout (To Do, In Progress, Done)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Drag and Drop**: Intuitively move tasks between columns or reorder within columns
- **Task Details**: View and edit task details in a modal
- **Create Tasks**: Add new tasks with title, description, and status
- **Responsive Design**: Works on desktop and mobile devices
- **API Integration**: Persists tasks using REST API calls

## Tech Stack

- **React** with TypeScript for the frontend
- **Tailwind CSS** for styling
- **@dnd-kit** for drag and drop functionality
- **Axios** for API calls
- **React Icons** for icons

## Project Structure

```
task-management-dashboard/
├── public/
│   ├── index.html
├── src/
│   ├── api/                   # API integration
│   ├── components/
│   │   ├── Icons/             # Icon components
│   ├── context/               # React context for global state
│   ├── hooks/                 # Custom hooks 
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Root component
│   ├── index.tsx              # Entry point
│   └── index.css              # Global styles
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
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


## Architecture and Approach

### State Management

The application uses React Context API for global state management:

- **TaskContext**: Manages task data and operations (fetch, add, update, move)
- **ThemeContext**: Manages theme preferences (light/dark mode)

Custom hooks (`useTasks` and `useTheme`) provide convenient access to these contexts.

### Component Design

The application follows a component-based architecture:

- **KanbanBoard**: The main component orchestrating the board layout and drag-and-drop logic
- **KanbanColumn**: Represents a column in the Kanban board with a specific status
- **TaskCard**: Represents an individual task with basic information
- **TaskDetailsModal**: Provides detailed view and editing capability for tasks
- **AddTaskModal**: Form for creating new tasks

### API Integration

The application uses a mock API implemented with JSONPlaceholder for demonstration purposes. In a real-world scenario, this would be replaced with an actual backend. The `taskApi` module handles all API interactions:

- `fetchTasks()`: Get all tasks
- `createTask()`: Create a new task
- `updateTask()`: Update an existing task
- `deleteTask()`: Delete a task

### Drag and Drop

The drag-and-drop functionality is implemented using @dnd-kit, allowing users to:

1. Move tasks between columns (changing status)
2. Reorder tasks within a column

### Theme Support

The application supports both light and dark themes, persisted in local storage and respecting the user's system preferences by default.

