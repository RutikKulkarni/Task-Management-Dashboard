import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import useTheme from "./hooks/useTheme";

// Wrapper component to use the theme hook
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="p-4 flex justify-end">
        <ThemeToggle />
      </div>
      <KanbanBoard />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
