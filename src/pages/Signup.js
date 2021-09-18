import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { init } from "ityped";

import { registerCall } from "../apiCalls";

export default function Signup() {
  const textRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const history = useHistory();

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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setShowLoading(false);
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);

    const resp = await registerCall({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
    });

    if (!resp) {
      setShowLoading(false);
      setError("Email already in use");
    } else {
      history.push("/login");
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
            <h2 className="text-center mb-4">Sign Up</h2>
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
              <Form.Group id="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Create your username"
                  ref={usernameRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  ref={passwordConfirmRef}
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
                  "Sign Up"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account ? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </Container>
  );
}
