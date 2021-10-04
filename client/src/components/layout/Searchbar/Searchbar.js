import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

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
      type="search"
      placeholder="Search for a plant"
      aria-label="Search"
      value={searchValue}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Searchbar;
