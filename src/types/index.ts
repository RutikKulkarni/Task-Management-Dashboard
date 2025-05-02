export type TaskStatus = "todo" | "inProgress" | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId?: number;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  userId?: number;
}

export interface UpdateTaskPayload {
  id: number;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface DragEndData {
  task: Task;
  destination: TaskStatus;
}

export type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: CreateTaskPayload) => Promise<void>;
  updateTask: (task: UpdateTaskPayload) => Promise<void>;
  fetchTasks: () => Promise<void>;
  moveTask: (dragEndData: DragEndData) => Promise<void>;
};
