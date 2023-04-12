import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

type TaskData = {
  id: string;
  title: string;
  description: string;
  lavel: string;
};

type Props = {
  itemTask: TaskData;
  startTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TodoTaskItem: React.FC<Props> = ({ itemTask, startTask, deleteTask }) => {
  const start = () => {
    startTask(itemTask.id);
    deleteTask(itemTask.id);
  };

  const deleteT = () => {
    deleteTask(itemTask.id);
  };

  return (
    <div>
      <Card
        style={{
          margin: "0.5rem",
          boxShadow: " -5px 5px 42px -17px rgba(0, 0, 0, 0.75)",
        }}
        key={itemTask.id}
      >
        <Card.Header>
          <Card.Title>
            {itemTask.title.toUpperCase()}{" "}
            {itemTask.lavel === "urgente" ? (
              <Spinner animation="grow" variant="danger" size="sm" />
            ) : (
              <></>
            )}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Card.Subtitle>Description</Card.Subtitle>
            {itemTask.description}
          </Card.Text>
          <Card.Subtitle>{itemTask.lavel}</Card.Subtitle>
          <Card.Subtitle>
            {moment().format("DD/MM/YYYY HH:mm:ss")}
          </Card.Subtitle>
          <Button
            variant="primary"
            onClick={start}
            style={{
              margin: "0.5rem",
              boxShadow: " -5px 5px 42px -17px rgba(0, 0, 0, 0.75)",
            }}
          >
            start
          </Button>
          <Button variant="danger" onClick={deleteT}>
            🗑️
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoTaskItem;
