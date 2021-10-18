import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dropdownitem.css";

const DropdownItem = ({ plant }) => {
  return plant ? (
    <Dropdown.Item as={Link} to={`/plant/${plant._id}`}>
      <div className="row">
        <div className="col-3">
          <img src={plant.image} alt={plant.name} />
        </div>
        <div className="col-7">
          <p>{plant.name}</p>
        </div>
        <div className="col-2">
          <p>€{plant.price}</p>
        </div>
      </div>
    </Dropdown.Item>
  ) : (
    <p>Loading......</p>
  );
};

export default DropdownItem;
