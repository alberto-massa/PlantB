import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./../../../plantb-logo.png"
import "./Navigation.css"
// import AuthService from "../../../services/auth.service";

// const authService = new AuthService();

export default function Navigation(props) {
  // const logout = () => {
  //   authService
  //     .logout()
  //     .then((res) => props.storeUser(null))
  //     .catch((err) => console.log(err));
  // };
  return (
    <Navbar bg="light" expand="xs">
      <Container>
        <Navbar.Brand href="#home">PlantB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Plants</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
