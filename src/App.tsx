import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100">
          <div className="p-4 flex justify-end">
            <ThemeToggle />
          </div>
          <KanbanBoard />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
