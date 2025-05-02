import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { TaskProvider } from "./context/TaskContext";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskProvider>
        <KanbanBoard />
      </TaskProvider>
    </div>
  );
};

export default App;
