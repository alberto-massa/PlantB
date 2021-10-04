import "./navigation.css"
import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar";
import React, { useState, useEffect } from "react";
import NotLoggedUser from "./NotLoggedUser/NotLoggedUser";
import PlantService from "../../../services/plant.service";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import LoggedUser from "./LoggedUser/LoggedUser";
import DropdownItem from "./DropdownItem/Dropdownitem";


const Navigation = (props) => {

      const [ plants, setPlants ] = useState([])
      const [ plantsList, setPlantsList ] = useState([])


useEffect(() => {

      const plantService = new PlantService();
      plantService.getPlants().then(res => setPlantsList( res.data ))

}, [])


const displayPlants = ( searchValue ) => {

      const filteredPlants = plantsList.filter(( plant ) => plant.name.toLowerCase().includes(searchValue.toLowerCase()))
      setPlants( filteredPlants )
      refreshPlants(plantsList)

}

const refreshPlants = (plantsList) => {

setPlants(plantsList)

}


const notLoggedUser = () => {

      return(
        <NotLoggedUser />
      )

}

const loggedUser = (props) => {

      return(
      <LoggedUser {...props} />
      )

  }

const dropdownItem = (plants) => {
 
      return(

        <DropdownItem plants={plants} />

        
      )
}


return (

  <Navbar bg="light" expand="xs">
    <Container>
      <Navbar.Brand as={ Link } to="/">PlantB</Navbar.Brand>
      <Navbar.Brand href="#">              
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
              
              <Dropdown className="d-inline mx-2" autoclose="inside">
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                    <Navbar.Brand><Searchbar plant={ displayPlants } /></Navbar.Brand>
                </Dropdown.Toggle>
                {dropdownItem(plants)}
                
              </Dropdown>
              

          {props.loggedUser ? (
            <>
              {loggedUser(props)}
            </>
          ) 
          : 
          (
            <>
              {notLoggedUser()}
            </>
          ) 
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default Navigation
