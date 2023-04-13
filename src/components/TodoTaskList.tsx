import React from "react";
import TodoTaskItem from "./TodoTaskItem";

interface TaskData {
  id: string;
  title: string;
  lavel: string;
  description: string;
}

interface TodoTaskListProps {
  todoTask: TaskData[];
  startTask: (id: TaskData) => void;
  deleteTask: (id: string) => void;
}

const TodoTaskList: React.FC<TodoTaskListProps> = ({
  todoTask,
  startTask,
  deleteTask,
}) => {
  return (
    <div className="task-list">
      <h2>({todoTask.length}) Tasks To Do</h2>
      {todoTask.map((itemTask) => {
        return (
          <TodoTaskItem
            key={itemTask.id}
            itemTask={itemTask}
            startTask={startTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
};

export default TodoTaskList;
