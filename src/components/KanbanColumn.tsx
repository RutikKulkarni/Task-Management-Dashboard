import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Column, Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const getColumnStyle = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return "bg-todo";
    case TaskStatus.IN_PROGRESS:
      return "bg-inprogress";
    case TaskStatus.DONE:
      return "bg-done";
    default:
      return "bg-gray-50";
  }
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onTaskClick,
}) => {
  return (
    <div className={`column ${getColumnStyle(column.status)}`}>
      <h2 className="column-header">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] ${
              snapshot.isDraggingOver ? "bg-gray-100 bg-opacity-50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onTaskClick={onTaskClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
