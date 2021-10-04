import React, { useState } from "react";
import { Container, FormControl, InputGroup } from "react-bootstrap"


const Searchbar = (props) => {

    const [searchValue, setSearchValue] = useState("")
    const { plant } = props

    const handleChange = (e) => {
        const { value } = e.target
        setSearchValue(value)
        plant(value)

    }

    return (
      <Container>
        <InputGroup className="mb-3 mt-4">
          <FormControl
            type="search"
            onChange={(e) => handleChange(e)}
            name="searchValue"
            value={searchValue}
            placeholder="Search for title..."
            aria-label="buscar"
          />
        </InputGroup>
      </Container>
    );
}

export default Searchbar