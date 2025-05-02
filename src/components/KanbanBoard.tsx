import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import AddTaskModal from "./AddTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import useTasks from "../hooks/useTasks";
import { Task, TaskStatus } from "../types";

const KanbanBoard: React.FC = () => {
  const { tasks, columns, loading, error, moveTask } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  // const handleDragEnd = async (result: DropResult) => {
  //   const { destination, source, draggableId } = result;

  //   // If no destination or dropped in the same place
  //   if (
  //     !destination ||
  //     (destination.droppableId === source.droppableId &&
  //       destination.index === source.index)
  //   ) {
  //     return;
  //   }

  //   // Find the task that was dragged
  //   const task = tasks.find((t) => t.id === draggableId);
  //   if (!task) return;

  //   // Find source and destination columns
  //   const sourceColumn = columns.find((c) => c.id === source.droppableId);
  //   const destColumn = columns.find((c) => c.id === destination.droppableId);

  //   if (!sourceColumn || !destColumn) return;

  //   // If moved to a different column, update the task status
  //   if (sourceColumn.id !== destColumn.id) {
  //     await moveTask(task.id, sourceColumn.status, destColumn.status);
  //   }
  // };
  // const { tasks, columns, loading, error, moveTask } = useTasks();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Prevent unnecessary updates if dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find((c) => c.id === source.droppableId);
    const destColumn = columns.find((c) => c.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Move task to new position
    try {
      await moveTask(draggableId, sourceColumn.status, destColumn.status);
    } catch (err) {
      console.error("Error moving task:", err);
    }
  };

  // Get tasks for a specific column
  const getTasksForColumn = (columnId: string): Task[] => {
    const column = columns.find((c) => c.id === columnId);
    if (!column) return [];

    return column.taskIds
      .map((taskId) => tasks.find((t) => t.id === taskId))
      .filter((task) => task !== undefined) as Task[];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Task Management Dashboard
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Add New Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksForColumn(column.id)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </DragDropContext>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default KanbanBoard;
