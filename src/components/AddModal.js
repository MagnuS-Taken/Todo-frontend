import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import Cookies from "js-cookie";

import { addNote } from "../apiCalls";

export default function AddModal({ closeEdit }) {
  const [showLoading, setShowLoading] = useState(false);
  const title = useRef();
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    await addNote({
      userId: Cookies.get("user"),
      title: title.current.value,
      desc: desc.current.value,
    });
    setShowLoading(false);
    closeEdit();
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "lightblue", color: "black" }}
      >
        <Modal.Title>Add a note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="About you" ref={title} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm="10" style={{ width: "100%" }}>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Type here"
                ref={desc}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={submitHandler}>
          {showLoading ? (
            <CircularProgress color="secondary" size="15px" />
          ) : (
            "Create Note"
          )}
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
}
