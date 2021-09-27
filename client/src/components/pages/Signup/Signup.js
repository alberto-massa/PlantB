import AuthService from "./../../../services/auth.service"
import React, { Component } from 'react'
import { Container, Form, Button } from "react-bootstrap";

 class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            address: "",
            age: 0,
            role: "User",
            avatar: ""
        }
        this.authService = new AuthService()
    }

    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {username, password, email, address, age, role, avatar} = this.state
        this.authService
          .signup(username, password, email, address, age, role, avatar)
          .then((res) => this.props.history.push("/",res))
          .catch((err) => console.log(err));
    }

    render() {
        return (
          <Container>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInput}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInput}
                  type="text"
                  placeholder="Postal address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name="age"
                  value={this.state.age}
                  onChange={this.handleInput}
                  type="date"
                  placeholder="Age"
                />
              </Form.Group>

              <Form.Control as="select" aria-label="Default select example">
                <option>Are you a company?</option>
                <option
                  name="role"
                  onChange={this.handleInput}
                  value={this.state.role === "User"}
                >
                  Yes
                </option>
                <option
                  name="role"
                  onChange={this.handleInput}
                  value={this.state.role === "Shop"}
                >
                  No
                </option>
              </Form.Control>

              <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  name="avatar"
                  value={this.state.avatar}
                  onChange={this.handleInput}
                  type="file"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        );
    }
}

export default Signup