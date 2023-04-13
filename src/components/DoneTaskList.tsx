import React from "react";
import DoneTaskItem from "./DoneTaskItem";

interface DoneTaskListProps {
  doneTask: {
    id: string;
    title: string;
    description: string;
    lavel: string;
  }[];
  deleteDoneFunction: (id: string) => void;
}
interface TaskData {
  id: string;
  title: string;
  lavel: string;
  description: string;
}

const DoneTaskList: React.FC<DoneTaskListProps> = ({
  doneTask,
  deleteDoneFunction,
}) => {
  return (
    <div className="task-list">
      <h2> ({doneTask.length}) Tasks Done </h2>
      {doneTask.map((itemTask) => (
        <DoneTaskItem
          itemTask={itemTask}
          key={itemTask.id}
          deleteDoneFunction={deleteDoneFunction}
        />
      ))}
    </div>
  );
};

export default DoneTaskList;
