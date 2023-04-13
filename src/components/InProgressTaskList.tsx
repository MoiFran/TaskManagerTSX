import React from "react";
import Button from "react-bootstrap/Button";
import InProgressTaskItem from "./InProgressTaskItem";

interface InProgressTaskListProps {
  inProgressTask: Array<{ id: string; name: string; description: string }>;
  doneFuntions: (id: string) => void;
}
interface TaskData {
  id: string;
  title: string;
  lavel: string;
  description: string;
}
const InProgressTaskList: React.FC<InProgressTaskListProps> = ({
  inProgressTask,
  doneFuntions,
}) => {
  return (
    <div className="task-list">
      <h2>({inProgressTask.length}) Tasks In Progress</h2>
      {inProgressTask.map((itemTask) => (
        <InProgressTaskItem
          key={itemTask.id}
          itemTask={itemTask}
          doneFuntions={doneFuntions}
        />
      ))}
    </div>
  );
};

export default InProgressTaskList;
