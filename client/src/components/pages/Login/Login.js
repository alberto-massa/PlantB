import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");

  const authService = new AuthService();

  const handleInput = (e) => {
    const { name, value } = e.target;
    name === 'username' ? setUsername(value) : setPassword(value)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    authService
      .login(username, password)
      .then((res) => {
        props.storeUser(res.data);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row className="mt-3 d-flex justify-content-center">
        <Col xs={8} sm={8} lg={6}>
          <Form className="container" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={username}
                onChange={(e) => handleInput(e)}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                onChange={(e) => handleInput(e)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <p className="text-center mt-4">
            Not registered? <Link to={"/register"}>Sign up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
