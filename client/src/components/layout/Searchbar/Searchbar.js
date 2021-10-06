import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./Searchbar.css"

const Searchbar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const { displayPlants } = props;
  const { changeToggle } = props
  let { toggle } = props

  console.log(toggle)

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    displayPlants(value);
    setTimeout(() => {
      clearState(searchValue);
      changeToggle(toggle)
    }, 3000);
    
  };
  const clearState = (searchValue) => {

    setSearchValue("")
  } 

  return (
    <>
      <FormControl
        className="searchbar__input rounded-pill"
        type="search"
        placeholder="Search for a plant"
        aria-label="Search"
        value={searchValue}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Searchbar;
