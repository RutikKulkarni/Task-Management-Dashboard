import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { useTasks } from "../hooks/useTasks";
import { Task, TaskStatus } from "../types";
import ThemeToggle from "./ThemeToggle";

const KanbanBoard: React.FC = () => {
  const { todoTasks, inProgressTasks, doneTasks, moveTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    const activeData = active.data.current as { task: Task } | undefined;

    if (activeData) {
      setActiveTask(activeData.task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeData = active.data.current as { task: Task } | undefined;
      const destination = over.id as TaskStatus;

      if (activeData && activeData.task) {
        moveTask({
          task: activeData.task,
          destination,
        });
      }
    }

    setActiveTask(null);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Task Management Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add New Task
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="To Do" tasks={todoTasks} status="todo" />
          <KanbanColumn
            title="In Progress"
            tasks={inProgressTasks}
            status="inProgress"
          />
          <KanbanColumn title="Done" tasks={doneTasks} status="done" />
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
};

export default KanbanBoard;
