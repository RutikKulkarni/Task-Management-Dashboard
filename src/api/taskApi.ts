import axios from "axios";
import { Task, TaskStatus } from "../types";

// Using JSONPlaceholder as a mock API
const API_URL = "https://jsonplaceholder.typicode.com";

// Helper to generate a unique ID (since JSONPlaceholder doesn't actually create new resources)
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Get all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    // We'll use the /todos endpoint but transform the data to match our Task type
    const response = await axios.get(`${API_URL}/todos?_limit=12`);

    // Transform the data to match our Task structure
    const tasks: Task[] = response.data.map((todo: any, index: number) => {
      // Distribute tasks evenly across the three statuses
      let status = TaskStatus.TODO;
      if (index % 3 === 1) status = TaskStatus.IN_PROGRESS;
      if (index % 3 === 2) status = TaskStatus.DONE;

      return {
        id: todo.id.toString(),
        title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
        description: `Description for task ${todo.id}`,
        status,
        createdAt: new Date().toISOString(),
      };
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Create a new task
export const createTask = async (
  task: Omit<Task, "id" | "createdAt">
): Promise<Task> => {
  try {
    // JSONPlaceholder will fake a creation but won't actually store the data
    await axios.post(`${API_URL}/todos`, {
      title: task.title,
      description: task.description,
      status: task.status,
      completed: task.status === TaskStatus.DONE,
    });

    // Create a task with the response data and additional fields
    const newTask: Task = {
      id: generateId(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: new Date().toISOString(),
    };

    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (task: Task): Promise<Task> => {
  try {
    // JSONPlaceholder will fake an update but won't actually store the data
    await axios.put(`${API_URL}/todos/${task.id}`, {
      title: task.title,
      description: task.description,
      status: task.status,
      completed: task.status === TaskStatus.DONE,
    });

    // Return the updated task
    return task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/todos/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
