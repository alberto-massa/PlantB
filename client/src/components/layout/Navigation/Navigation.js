import "./navigation.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import React, { useState, useEffect } from "react";
import NotLoggedUser from "./NotLoggedUser/NotLoggedUser";
import PlantService from "../../../services/plant.service";
import CartService from "../../../services/cart.service";
import LoggedUser from "./LoggedUser/LoggedUser";
import DropdownItem from "./DropdownItem/Dropdownitem";
import { Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import logoImg from "../../../logo.svg";
import { FaShoppingCart } from "react-icons/fa";

const Navigation = (props) => {
  const cartService = new CartService();

  const [plants, setPlants] = useState([]);
  const [plantsList, setPlantsList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [searching, setSearching] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const plantService = new PlantService();

    refreshTotal();

    plantService.getPlants().then((res) => setPlantsList(res.data)).catch(err => console.log(err));
    
  }, []);

  useEffect(() => {
    if (!searching || plants.length === 0) setToggle(false);
    else setToggle(true);
  }, [plants, searching]);

  useEffect(() => refreshTotal());

  const displayPlants = (searchValue) => {
    if (searchValue && searchValue.length > 0) setSearching(true);
    else setSearching(false);

    const filteredPlants = plantsList.filter((plant) =>
      plant.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setPlants(filteredPlants);
  };

  const changeToggle = (toggle) => {
    toggle && setToggle(false);
  };

  const refreshTotal = () => {
    cartService
      .getCart(props.loggedUser?.cart)
      .then((res) => res.data.items.length && setTotal(res.data.items.length))
      .catch((err) => console.log(err));
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
              onBlur={(e) => (e.target.value = "")}
              onToggle={(isOpen, e, metadata) => {
                if (plants.length === 0) setToggle(false);
                else if (isOpen) setToggle(isOpen);
                else if (e.target.type !== "button") setToggle(isOpen);
              }}
            >
              <Dropdown.Toggle
                className="navbar__toggle"
                id="dropdown-autoclose-inside"
              >
                <Searchbar
                  toggle={toggle}
                  changeToggle={changeToggle}
                  displayPlants={displayPlants}
                />
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
          {props.loggedUser ? (
            <>
              <Navbar.Brand
                className="navbar__cart my-0 mx-5"
                as={Link}
                onClick={() => refreshTotal()}
                to={`/cart`}
              >
                <p>
                  <FaShoppingCart />
                  &nbsp; &#40; {total} &#41;
                </p>
              </Navbar.Brand>
              <Nav.Link
                className="navbar__cart__collapsed"
                as={Link}
                to={`/cart`}
              >
                Cart &nbsp; &#40; {total} &#41;
              </Nav.Link>

              <Nav>
                <LoggedUser {...props} />
              </Nav>
            </>
          ) : (
            <NotLoggedUser />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
