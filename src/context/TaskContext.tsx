import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Task, TaskStatus, Column } from "../types";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";

interface TaskContextProps {
  tasks: Task[];
  columns: Column[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  moveTask: (
    taskId: string,
    sourceStatus: TaskStatus,
    destinationStatus: TaskStatus
  ) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  columns: [],
  loading: false,
  error: null,
  addTask: async () => {},
  updateTaskStatus: async () => {},
  moveTask: async () => {},
});

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "To Do", status: TaskStatus.TODO, taskIds: [] },
    {
      id: "2",
      title: "In Progress",
      status: TaskStatus.IN_PROGRESS,
      taskIds: [],
    },
    { id: "3", title: "Done", status: TaskStatus.DONE, taskIds: [] },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize tasks and columns
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);

        // Update columns with task IDs
        setColumns((prevColumns) => {
          const newColumns = [...prevColumns];

          // Reset taskIds arrays
          newColumns.forEach((column) => {
            column.taskIds = [];
          });

          // Assign tasks to columns
          fetchedTasks.forEach((task) => {
            const column = newColumns.find((col) => col.status === task.status);
            if (column) {
              column.taskIds.push(task.id);
            }
          });

          return newColumns;
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
        console.error(err);
      }
    };

    loadTasks();
  }, []);

  // Add a new task
  const addTask = async (newTaskData: Omit<Task, "id" | "createdAt">) => {
    try {
      const newTask = await createTask(newTaskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Add task ID to appropriate column
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const columnIndex = newColumns.findIndex(
          (col) => col.status === newTask.status
        );

        if (columnIndex !== -1) {
          newColumns[columnIndex].taskIds.push(newTask.id);
        }

        return newColumns;
      });
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  // Update a task's status
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);

      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, status: newStatus };
        await updateTask(updatedTask);

        // Update task in state
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      }
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  // Move a task between columns (drag and drop)
  const moveTask = async (
    taskId: string,
    sourceStatus: TaskStatus,
    destinationStatus: TaskStatus
  ) => {
    try {
      // Update columns state
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];

        // Find source and destination columns
        const sourceColumn = newColumns.find(
          (col) => col.status === sourceStatus
        );
        const destColumn = newColumns.find(
          (col) => col.status === destinationStatus
        );

        if (sourceColumn && destColumn) {
          // Remove from source column
          sourceColumn.taskIds = sourceColumn.taskIds.filter(
            (id) => id !== taskId
          );

          // Add to destination column if not already there
          if (!destColumn.taskIds.includes(taskId)) {
            destColumn.taskIds.push(taskId);
          }
        }

        return newColumns;
      });

      // Update task status
      await updateTaskStatus(taskId, destinationStatus);
    } catch (err) {
      setError("Failed to move task");
      console.error(err);
    }
  };

  const value = {
    tasks,
    columns,
    loading,
    error,
    addTask,
    updateTaskStatus,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
