import React, { useState } from "react";
import { ListGroup, Card, Button, Modal } from "react-bootstrap";
import { Create, Delete } from "@material-ui/icons";
import { format } from "timeago.js";

import { deleteNote } from "../apiCalls";
import EditModal from "./EditModal";

const postTopStyle = {
  fontSize: "20px",
  margin: "0 10px",
};

export default function Note({ note }) {
  const [showEdit, setShowEdit] = useState(false);

  const closeEdit = () => setShowEdit(false);

  const deleteHandler = async (e) => {
    e.preventDefault();

    await deleteNote(note._id);

    window.location.reload();
  };

  return (
    <React.Fragment>
      <Card
        style={{
          width: "100",
          margin: "1.5vh 1.5vw",
          position: "sticky",
          boxShadow: "2px 0px 19px 0px rgba(50, 50, 50, 0.65)",
          border: "2px solid lightblue",
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex" variant="">
            <span style={{ ...postTopStyle, fontWeight: "500" }}>
              {note.title}
            </span>
            <span
              style={{
                ...postTopStyle,
                fontSize: "15px",
                paddingTop: "5px",
                color: "gray",
                marginLeft: "5vw",
              }}
            >
              Created {format(note.createdAt)}
            </span>
          </ListGroup.Item>

          <ListGroup.Item
            className="d-flex flex-column"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            <span>{note.desc ? note.desc : ""}</span>
          </ListGroup.Item>

          <ListGroup.Item
            variant="info"
            className="d-flex justify-content-between"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            <Button variant="success" onClick={() => setShowEdit(true)}>
              Edit &nbsp;
              <Create style={{ fontSize: "3vh " }} />
            </Button>

            <Modal size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
              <EditModal data={note} closeEdit={closeEdit} />
            </Modal>

            <Button variant="danger" onClick={(e) => deleteHandler(e)}>
              Delete &nbsp;
              <Delete style={{ fontSize: "3vh " }} />
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
}
