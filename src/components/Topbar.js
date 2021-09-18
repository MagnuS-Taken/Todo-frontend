import React, { useState } from "react";
import { Navbar, Button, Modal } from "react-bootstrap";
import { Forum, PowerSettingsNew, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import AddModal from "./AddModal";

export default function Topbar() {
  const [showEdit, setShowEdit] = useState(false);

  const closeEdit = () => setShowEdit(false);

  const logoutHandler = () => {
    Cookies.remove("user");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Navbar
        bg="success"
        variant="dark"
        className="d-flex w-100"
        style={{
          position: "fixed",
          borderBottomLeftRadius: "7px",
          borderBottomRightRadius: "7px",
          zIndex: "2",
          backgroundColor: "ligthcoral",
          justifyContent: "space-between",
        }}
      >
        <Navbar.Brand href="#" style={{ margin: "auto 1vw", color: "white" }}>
          <Forum />
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            To-Do
          </Link>
        </Navbar.Brand>

        <Button
          variant="info"
          className="d-flex"
          style={{ color: "white" }}
          onClick={() => setShowEdit(true)}
        >
          <span>Add Note</span>
          <Add style={{ fontSize: "4vh " }} />
        </Button>

        <Modal size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
          <AddModal closeEdit={closeEdit} />
        </Modal>

        <Button
          style={{ marginLeft: "75vw" }}
          variant="success"
          onClick={logoutHandler}
        >
          <PowerSettingsNew style={{ fontSize: "4vh ", color: "black" }} />
        </Button>

        <p></p>
      </Navbar>
    </React.Fragment>
  );
}
