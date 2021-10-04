import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./Searchbar.css"

const Searchbar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const { displayPlants } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    displayPlants(value);
  };

  return (
    <FormControl
      className="searchbar__input"
      type="search"
      placeholder="Search for a plant"
      aria-label="Search"
      value={searchValue}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Searchbar;
