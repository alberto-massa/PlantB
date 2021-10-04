import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dropdownitem.css";

// const DropdownItem = ({plants}) => {
const DropdownItem = ({ plant }) => {
  return (
    // <Dropdown.Menu className="dropdown__menu">
    //   { plants.length > 0 && plants.map(( plant, idx ) =>
    //   <Dropdown.Item as={Link} key={ `${plant._id}-${idx}`} to={`/plant/${plant._id}`}>
    //     <div className="row">
    //       <div className="col-3">
    //         <img src={plant.image} alt={plant.name}/>
    //       </div>
    //       <div className="col-5">
    //         <p>{ plant.name }</p>
    //       </div>
    //     </div>
    //   </Dropdown.Item>) }
    // </Dropdown.Menu>
    plant ? (
      <Dropdown.Item as={Link} to={`/plant/${plant._id}`}>
        <div className="row">
          <div className="col-3">
            <img src={plant.image} alt={plant.name} />
          </div>
          <div className="col-5">
            <p>{plant.name}</p>
          </div>
        </div>
      </Dropdown.Item>
    ) : (
      <p>Loading......</p>
    )
  );
};

export default DropdownItem;
