import { Dropdown } from "react-bootstrap"



const DropdownItem = ({plants}) => {
return(
        <Dropdown.Menu>
          { plants.length > 0 && plants.map(( plant, idx ) =>
          <Dropdown.Item key={ `${plant._id}-${idx}` } href={ `/plant/${plant._id}` } eventKey="2">
          <li>{ plant.name }</li>
          </Dropdown.Item>) }
        </Dropdown.Menu>

)

}

export default DropdownItem