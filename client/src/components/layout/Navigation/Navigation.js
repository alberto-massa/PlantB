import React, { useState, useEffect } from "react";
import { Container, Dropdown, Nav, Navbar, Link} from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import PlantService from "../../../services/plant.service";
import Searchbar from "../Searchbar/Searchbar";

const Navigation = (props) => {
  
  const [plants, setPlants] = useState([])
  const [plantsList, setPlantsList] = useState([])
  
  const authService = new AuthService();
  const logout = () => {
    authService
    .logout()
    .then(() => props.storeUser(null))
    .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    const plantService = new PlantService();
    
    plantService.getPlants().then(res => setPlantsList(res.data))
    
  }, [])


const displayPlants = (searchValue) => {
  
  const filteredPlants = plantsList.filter((plant) => plant.name.toLowerCase().includes(searchValue.toLowerCase()))
  console.log(filteredPlants)

  setPlants(filteredPlants)
}
  
  return (
    <Navbar bg="light" expand="xs">
      <Container>
        <Navbar.Brand as={Link} to="/">PlantB</Navbar.Brand>
        <Navbar.Brand as={Link} to="#">
          <Searchbar plant={displayPlants} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {props.loggedUser ? (
              <>
                <Nav.Link as={Link} to="/" onClick={logout}>
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/new-plant">New Plant</Nav.Link>
                <Nav.Link as={Link} to="/new-comment">New Comment</Nav.Link>
                <Nav.Link as={Link} to="/new-message">New Message</Nav.Link>
                <Nav.Link as={Link} to="/profile">My profile</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation
