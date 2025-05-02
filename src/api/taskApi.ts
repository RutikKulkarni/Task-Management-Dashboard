import axios from "axios";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const taskApi = {
  // Fetch all tasks
  async fetchTasks(): Promise<Task[]> {
    try {
      // In a real app, we might want to fetch tasks by status or use query params
      const response = await axios.get(`${API_URL}/todos`);

      // Transform the data to match our Task type
      return response.data.slice(0, 15).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: `Task description for ${item.title}`,
        status: item.completed
          ? "done"
          : Math.random() > 0.5
          ? "inProgress"
          : "todo",
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData: CreateTaskPayload): Promise<Task> {
    try {
      const response = await axios.post(`${API_URL}/todos`, taskData);
      return {
        id: response.data.id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      };
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update an existing task
  async updateTask(taskData: UpdateTaskPayload): Promise<Task> {
    try {
      const response = await axios.patch(
        `${API_URL}/todos/${taskData.id}`,
        taskData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(taskId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/todos/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
