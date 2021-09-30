import React, { useState } from "react";
import { Container, FormControl, InputGroup } from "react-bootstrap"




const Searchbar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleChange = (e) => {
        const { value } = e.target
        setSearchValue(value)


        props.displayPlants(searchValue)

    }

     


    return(

        <Container>

            <InputGroup className="mb-3 mt-4">
                <FormControl
                onChange={e => handleChange(e)}
                name="searchValue"
                value={searchValue}
                placeholder="Search for title..."
                aria-label="buscar"
                />

            </InputGroup>

        </Container>

    )
}

export default Searchbar