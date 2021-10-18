import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./Searchbar.css"

const Searchbar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const { displayPlants } = props;
  const { changeToggle } = props
  const { toggle } = props

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    displayPlants(value);
    setTimeout(() => {
        clearState(searchValue);
      changeToggle(toggle)
    }, 5000);
    
  };
  const clearState = (searchValue) => {

    setSearchValue("")
  } 

  return (
    <>
      <FormControl
        className="searchbar__input rounded-pill"
        type="search"
        placeholder="&#x1F50D; Search for a plant"
        aria-label="Search"
        value={searchValue}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Searchbar;
