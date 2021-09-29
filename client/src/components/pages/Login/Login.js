import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import AuthService from "../../../services/auth.service";

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
      <Form onSubmit={handleFormSubmit}>
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
    </Container>
  );
};

export default Login;
