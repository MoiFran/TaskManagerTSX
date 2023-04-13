import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

interface InProgressItemProps {
  itemTask: {
    id: number;
    title: string;
    description: string;
    lavel: string;
  };
  doneFuntions: (id: number) => void;
}

const InProgressItem: React.FC<InProgressItemProps> = ({
  itemTask,
  doneFuntions,
}) => {
  const done = () => {
    doneFuntions(itemTask.id);
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
          <Card.Subtitle>{itemTask.lavel.toUpperCase()}</Card.Subtitle>
          <Card.Subtitle>
            {moment().format("DD/MM/YYYY HH:mm:ss")}
          </Card.Subtitle>
          <Button
            variant="primary"
            onClick={done}
            style={{
              margin: "0.5rem",
              boxShadow: " -5px 5px 42px -17px rgba(0, 0, 0, 0.75)",
            }}
          >
            Done
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InProgressItem;
