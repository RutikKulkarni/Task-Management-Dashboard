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

        // Build column taskIds from fetched tasks
        const newColumns = columns.map((column) => {
          return {
            ...column,
            taskIds: fetchedTasks
              .filter((task) => task.status === column.status)
              .map((task) => task.id),
          };
        });

        setColumns(newColumns);
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

      // Update tasks state with the new task
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Update column taskIds
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column.status === newTask.status) {
            return {
              ...column,
              taskIds: [...column.taskIds, newTask.id],
            };
          }
          return column;
        });
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
      if (!taskToUpdate) {
        console.error("Task not found:", taskId);
        return;
      }

      const updatedTask = { ...taskToUpdate, status: newStatus };
      await updateTask(updatedTask);

      // Update tasks state with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
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
      // Find source and destination columns
      const sourceColumn = columns.find((col) => col.status === sourceStatus);
      const destColumn = columns.find(
        (col) => col.status === destinationStatus
      );

      if (!sourceColumn || !destColumn) {
        console.error("Could not find source or destination column");
        return;
      }

      // Update columns state
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          // Remove from source column
          if (column.status === sourceStatus) {
            return {
              ...column,
              taskIds: column.taskIds.filter((id) => id !== taskId),
            };
          }

          // Add to destination column
          if (column.status === destinationStatus) {
            // Check if taskId already exists in destination to prevent duplicates
            if (!column.taskIds.includes(taskId)) {
              return {
                ...column,
                taskIds: [...column.taskIds, taskId],
              };
            }
          }

          return column;
        });
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
