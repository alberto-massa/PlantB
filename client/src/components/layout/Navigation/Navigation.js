import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import PlantService from "../../../services/plant.service";

const authService = new AuthService();

const Navigation = (props) => {
  const logout = () => {
    authService
      .logout()
      .then(() => props.storeUser(null))
      .catch((err) => console.log(err));
  };

  const getPlants = () =>{

    PlantService
      .getPlants()
      .then(res)

  }
  
  return (
    <Navbar bg="light" expand="xs">
      <Container>
        <Navbar.Brand href="/">PlantB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new-plant">New Plant</Nav.Link>
            
            {props.loggedUser ?
              <>
              <Nav.Link href="/" onClick={ logout }>Logout</Nav.Link>
              </>
              :
              <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation
