import "./navigation.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import React, { useState, useEffect } from "react";
import NotLoggedUser from "./NotLoggedUser/NotLoggedUser";
import PlantService from "../../../services/plant.service";
import LoggedUser from "./LoggedUser/LoggedUser";
import DropdownItem from "./DropdownItem/Dropdownitem";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import logoImg from "../../../logo.svg";

const Navigation = (props) => {
  const [plants, setPlants] = useState([]);
  const [plantsList, setPlantsList] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const plantService = new PlantService();
    plantService.getPlants().then((res) => setPlantsList(res.data));
  }, []);

  useEffect(() => {
    if (!searching || plants.length === 0) setToggle(false);
    else setToggle(true);
  }, [plants, searching]);

  const displayPlants = (searchValue) => {
    if (searchValue && searchValue.length > 0) setSearching(true);
    else setSearching(false);

    const filteredPlants = plantsList.filter((plant) =>
      plant.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    setPlants(filteredPlants);
  };

  const changeToggle = (toggle) => {

    toggle && setToggle(false)
  }
    

  return (
    <Navbar
      className="navbar fixed-top"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar__logo" as={Link} to="/">
          <img alt="logo" src={logoImg} /> Plant B
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Dropdown
              className="d-inline mx-2 "
              autoclose="inside"
              show={toggle}
              onBlur={e => e.target.value = "" }
              onToggle={(isOpen, e, metadata) => {
                console.log(e);
                if (plants.length === 0) setToggle(false);
                else if (isOpen) setToggle(isOpen);
                else if (e.target.type !== "button") setToggle(isOpen);
              }}
            >
              <Dropdown.Toggle
                className="navbar__toggle"
                id="dropdown-autoclose-inside"
              >
                <Searchbar toggle={toggle} changeToggle={changeToggle} displayPlants={displayPlants} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown__menu">
                {plants.length > 0 &&
                  plants.map((plant) => (
                    <Link to={`/plant/${plant._id}`}>
                      <DropdownItem key={plant._id} plant={plant} />
                    </Link>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav>
            {props.loggedUser ? <LoggedUser {...props} /> : <NotLoggedUser />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
