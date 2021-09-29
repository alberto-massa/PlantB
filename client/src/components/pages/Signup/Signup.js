import AuthService from "./../../../services/auth.service";
import React, { Component } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import UploadService from "./../../../services/upload.service";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      address: "",
      age: 0,
      role: false,
      avatar: "",
    };
    this.authService = new AuthService();
    this.uploadService = new UploadService();
  }

  handleInput = (e) => {
    let { name, value, type } = e.target;

    type === "radio" && (value === "true" ? (value = true) : (value = false));

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    let { username, password, email, address, age, role, avatar } = this.state;
    role ? (role = "Shop") : (role = "User");

    this.authService
      .signup(username, password, email, address, age, role, avatar)
      .then(() => this.props.history.push("/"))
      .catch((err) => console.log(err));
  };

  handleFile = (e) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);


    this.uploadService
      .uploadImg(uploadData)
      .then((res) => {
        this.setState({
          ...this.state,
          isLoading: false,
          avatar: res.data.cloudinary_url,
        });
        console.log(res.data.cloudinary_url);
      })
      .catch((err) => alert("Error, image not uploaded "));
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleInput(e)}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleInput(e)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              name="email"
              value={this.state.email}
              onChange={(e) => this.handleInput(e)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              name="address"
              value={this.state.address}
              onChange={(e) => this.handleInput(e)}
              type="text"
              placeholder="Postal address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Date of Birth*</Form.Label>
            <Form.Control
              name="age"
              value={this.state.age}
              onChange={(e) => this.handleInput(e)}
              type="date"
              placeholder="Age"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Are you a company?</Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`}>
                <Form.Check
                  inline
                  label="Yes"
                  name="role"
                  type="radio"
                  id={`inline-${type}-1`}
                  value={true}
                  onChange={(e) => this.handleInput(e)}
                />
                <Form.Check
                  defaultChecked
                  inline
                  label="No"
                  name="role"
                  type="radio"
                  id={`inline-${type}-2`}
                  value={false}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
            ))}
          </Form.Group>

          <Form.Group className="mb-3" controlId="avatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              name="avatar"
              onChange={(e) => this.handleFile(e)}
              type="file"
            />
          </Form.Group>

          {this.state.isLoading && (
            <Spinner animation="border" variant="success" />
          )}

          <Button
            disabled={this.state.isLoading}
            variant="primary"
            type="submit"
          >
            {this.state.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Container>
    );
  }
}


        

export default Signup;
