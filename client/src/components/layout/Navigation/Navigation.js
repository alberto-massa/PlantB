import "./navigation.css"
import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import PlantService from "../../../services/plant.service";
import { Container, Dropdown, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logoImg from "../../../logo.svg"

const Navigation = (props, click) => {

  const [ plants, setPlants ] = useState([])
  const [ plantsList, setPlantsList ] = useState([])

  const authService = new AuthService();
  const logout = () => {
    authService
      .logout()
      .then(() => props.storeUser(null))
      .catch((err) => console.log(err));

  };

  useEffect(() => {

    const plantService = new PlantService();
    plantService.getPlants().then(res => setPlantsList( res.data ))

  }, [])


  const displayPlants = ( searchValue ) => {

    const filteredPlants = plantsList.filter(( plant ) => plant.name.toLowerCase().includes(searchValue.toLowerCase()))
    setPlants( filteredPlants )

  }

  return (
    <>
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="navbar__logo" as={Link} to="/">
            <img alt="logo" src={logoImg} />
            Plant B
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search for a plant"
                  aria-label="Search"
                  plant={displayPlants}
                />
                {/* <ul> */}
                <Dropdown.Menu>
                  {plants.length > 0 &&
                    plants.map((plant, idx) => (
                      <Dropdown.Item
                    
                        key={`${plant._id}-${idx}`}
                        href={`/plant/${plant._id}`}
                        eventKey="2"
                      >
                        <li>{plant.name}</li>
                      
                     </Dropdown.Item>
                    ))}
                    
                     </Dropdown.Menu>
                {/* </ul> */}
              </Form>
            </Nav>
            <Nav>
              {props.loggedUser ? (
                <NavDropdown
                  title={
                    <Navbar.Text>
                      Welcome,
                      <a href="#/"> {props.loggedUser.username} </a>
                      <img
                        alt="user avatar"
                        className="navbar__avatar rounded-circle"
                        src={props.loggedUser.avatar}
                      />
                    </Navbar.Text>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to={`/${props.loggedUser.username}`}
                  >
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/new-message">
                    Send a message
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/new-plant">
                    Add a plant
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/new-comment">
                    Add a comment
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      {/* <Navbar bg="light" expand="xs">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PlantB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Dropdown className="d-inline mx-2" autoclose="inside">
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                  <Navbar.Brand>
                    <Searchbar plant={displayPlants} />
                  </Navbar.Brand>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {plants.length > 0 &&
                    plants.map((plant, idx) => (
                      <Dropdown.Item
                        key={`${plant._id}-${idx}`}
                        href={`/plant/${plant._id}`}
                        eventKey="2"
                      >
                        <li>{plant.name}</li>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>

              {props.loggedUser ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={logout}>
                    Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/new-plant">
                    New Plant
                  </Nav.Link>
                  <Nav.Link as={Link} to="/new-comment">
                    New Comment
                  </Nav.Link>
                  <Nav.Link as={Link} to="/new-message">
                    New Message
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/${props.loggedUser.username}`}>
                    My profile
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
}

export default Navigation
