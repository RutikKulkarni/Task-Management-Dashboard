import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  index: number;
  onTaskClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onTaskClick }) => {
  // We ensure the draggableId is a string (React Beautiful DnD requirement)
  const draggableId = String(task.id);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${
            snapshot.isDragging ? "dragging" : ""
          } hover:ring-2 hover:ring-primary hover:cursor-grab active:cursor-grabbing`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onTaskClick(task)}
        >
          <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {task.description || "No description provided"}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>
              ID:{" "}
              {typeof task.id === "string" && task.id.length > 8
                ? `${task.id.substring(0, 4)}...`
                : task.id}
            </span>
            <span>
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : "Unknown date"}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
