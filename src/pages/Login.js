import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { init } from "ityped";
import Cookies from "js-cookie";

import { loginCall } from "../apiCalls";

export default function Login() {
  const textRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    init(textRef.current, {
      typeSpeed: 50,
      backDelay: 2000,
      backSpeed: 60,
      strings: [
        "Quickly capture what’s on your mind and access them from anywhere",
        "Made by Payas Singh Nikhurpa",
      ],
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (
      emailRef.current.value.length === 0 ||
      passwordRef.current.value.length === 0
    ) {
      setShowLoading(false);
      return setError(`Fields cannot be empty`);
    }

    setError("");
    setLoading(true);
    const resp = await loginCall({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (!resp) {
      setShowLoading(false);
      setError("Invalid e-mail or Password");
    } else {
      Cookies.set("user", resp._id);
      window.location.reload();
    }

    setShowLoading(false);
    setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="w-100" style={{ maxWidth: "50vw" }}>
        <h3 style={{ fontSize: "50px", fontWeight: "800", color: "orange" }}>
          TO DO
        </h3>
        <span style={{ fontSize: "17px" }} ref={textRef}></span>
      </div>

      <div className="w-100" style={{ maxWidth: "50vw" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  minLength="6"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                variant="warning"
                className="w-100 "
                type="submit"
              >
                {showLoading ? (
                  <CircularProgress color="secondary" size="15px" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password ?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Dont't have an account ? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}
