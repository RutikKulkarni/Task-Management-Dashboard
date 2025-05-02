import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  index: number;
  onTaskClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onTaskClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
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
            {task.description}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>ID: {task.id.substring(0, 4)}...</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="mt-2 text-xs text-right text-blue-500">
            Click to view details
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
