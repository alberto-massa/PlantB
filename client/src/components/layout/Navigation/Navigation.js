import React, { useState } from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import PlantService from "../../../services/plant.service";
import Searchbar from "../Searchbar/Searchbar";

const Navigation = (props) => {
  
  const authService = new AuthService();
  const plantService = new PlantService();
  
  const [plants, setPlants] = useState(null)

  const logout = () => {
    authService
      .logout()
      .then(() => props.storeUser(null))
      .catch((err) => console.log(err));
  };


  const getPlants = () => {

  plantService
    .getPlants()
    .then((res) => setPlants(res))
    .catch(err => console.error(err))

}

const displayPlants = (searchValue) => {

const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchValue.toLowerCase()))
return(

  filteredPlants.length > 0 ? 
  filteredPlants.map(plant => {

      return(

        <p>name:{plant.name}</p>
      )
    
  })
  :
  <p>Sin resultados...</p>
)

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
