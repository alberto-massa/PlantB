import "./navigation.css"
import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import PlantService from "../../../services/plant.service";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";

const authService = new AuthService();

const Navigation = (props) => {

  const [ plants, setPlants ] = useState([])
  const [ plantsList, setPlantsList ] = useState([])


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


  const displayPlants = ( searchValue ) => {

    const filteredPlants = plantsList.filter((plant) => plant.name.toLowerCase().includes(searchValue.toLowerCase()))
    setPlants(filteredPlants)
  }

  return (

    <Navbar bg="light" expand="xs">
      <Container>
        <Navbar.Brand as={ Link } to="/"> PlantB </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                <Nav.Link as={ Link } to="/"> Home </Nav.Link>
                <Dropdown className="d-inline mx-2" autoclose="inside">
                  <Dropdown.Toggle id="dropdown-autoclose-inside">
                      <Navbar.Brand><Searchbar plant={ displayPlants } /></Navbar.Brand>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    { plants.length > 0 && plants.map(( plant, idx ) =>
                    <Dropdown.Item key={ `${ plant._id }-${ idx }` } href={ `/plant/${ plant._id }` } eventKey="2">
                      <li>{ plant.name }</li></Dropdown.Item>) }
                    </Dropdown.Menu>
                </Dropdown>
                
              {props.loggedUser ? 
              (
              <>
                <Nav.Link as={ Link} to="/" onClick={ logout }>
                  Logout
                </Nav.Link>
                <Nav.Link as={ Link } to="/new-plant"> New Plant </Nav.Link>
                <Nav.Link as={ Link } to="/new-comment"> New Comment </Nav.Link>
                <Nav.Link as={ Link } to="/new-message"> New Message </Nav.Link>
                <Nav.Link as={ Link } to={`/${props.loggedUser.username}`}> My profile </Nav.Link>
              </>
              ) 
              : 
              (
              <>
                <Nav.Link as={ Link } to="/login"> Login </Nav.Link>
                <Nav.Link as={ Link } to="/register"> Register </Nav.Link>
              </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation
