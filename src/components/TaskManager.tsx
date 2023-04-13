import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import TodoTaskList from "./TodoTaskList";
import InProgressTaskList from "./InProgressTaskList";
import DoneTaskList from "./DoneTaskList";
import "bootstrap/dist/css/bootstrap.min.css";

interface TaskData {
  id: string;
  title: string;
  lavel: string;
  description: string;
}

interface Props {
  todoTask: TaskData[];
  inProgressTask: TaskData[];
  doneTask: TaskData[];
  stratTask: (id: string) => void;
  doneFuntions: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteDoneFunction: (id: string) => void;
}

const TaskManager = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, reset } = useForm<TaskData>({
    defaultValues: {},
  });

  const [todoTask, setTodoTask] = useState<TaskData[]>(
    JSON.parse(localStorage.getItem("TodoTaskList") ?? "[]")
  );

  const [inProgressTask, setInprogressTask] = useState<TaskData[]>(
    JSON.parse(localStorage.getItem("InProgressList") ?? "[]")
  );

  const [doneTask, setDoneTask] = useState<TaskData[]>(
    JSON.parse(localStorage.getItem("DoneList") ?? "[]")
  );

  const onSubmit = (data: TaskData) => {
    data.id = uuidv4();
    let todoList = [...todoTask, data];
    localStorage.setItem("TodoTaskList", JSON.stringify(todoList));
    setTodoTask(todoList);
    reset();
  };

  const startTask = (id: string) => {
    let todoTaskList = JSON.parse(
      localStorage.getItem("TodoTaskList") ?? "[]"
    ) as TaskData[];
    let inProArray = todoTaskList.filter((item) => item.id === id);
    let inProgressList = [...inProgressTask, inProArray[0]];

    localStorage.setItem("InProgressList", JSON.stringify(inProgressList));
    setInprogressTask(inProgressList);
  };

  const deleteTask = (id: string) => {
    let todoTaskList = JSON.parse(
      localStorage.getItem("TodoTaskList") ?? "[]"
    ) as TaskData[];
    let todoTaskNew = todoTaskList.filter((item) => item.id !== id);
    localStorage.setItem("TodoTaskList", JSON.stringify(todoTaskNew));
    setTodoTask(todoTaskNew);
  };

  const doneFuntions = (id: string) => {
    let doneTaskList = JSON.parse(
      localStorage.getItem("InProgressList") ?? "[]"
    ) as TaskData[];
    let doneTaskNew = doneTaskList.filter((item) => item.id === id);
    let doneList = [...doneTask, doneTaskNew[0]];
    localStorage.setItem("DoneList", JSON.stringify(doneList));
    setDoneTask(doneList);
    let newTaskInProgressList = doneTaskList.filter((item) => item.id !== id);
    setInprogressTask(newTaskInProgressList);
    localStorage.setItem(
      "InProgressList",
      JSON.stringify(newTaskInProgressList)
    );
  };

  const deleteDoneFunction = (id: string) => {
    let doneTaskList = JSON.parse(
      localStorage.getItem("DoneList") ?? "[]"
    ) as TaskData[];
    let newDoneTaskList = doneTaskList.filter((item) => item.id !== id);
    localStorage.setItem("DoneList", JSON.stringify(newDoneTaskList));
    setDoneTask(newDoneTaskList);
  };

  return (
    <div className="form-container">
      <Button variant="primary" onClick={handleShow}>
        New Task ➕
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-style">
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              style={{ textAlign: "center" }}
            >
              New Task
            </Modal.Title>
          </Modal.Header>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Title"
              {...register("title")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Lavel</Form.Label>
            <Form.Select {...register("lavel")}>
              <option value="normal">normal</option>
              <option value="medio">medio</option>
              <option value="urgente">urgente</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description </Form.Label>
            <Form.Control as="textarea" rows={3} {...register("description")} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
      <div className="task-container">
        <TodoTaskList
          todoTask={todoTask}
          startTask={startTask}
          deleteTask={deleteTask}
        />
        <InProgressTaskList
          inProgressTask={inProgressTask}
          doneFuntions={doneFuntions}
        />
        <DoneTaskList
          doneTask={doneTask}
          deleteDoneFunction={deleteDoneFunction}
        />
      </div>
    </div>
  );
};

export default TaskManager;
