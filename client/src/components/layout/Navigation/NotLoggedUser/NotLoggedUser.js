import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

 const NotLoggedUser = () => {

    return (
      <div className="navbar__collapsed">
        <NavDropdown.Divider /> 
        <div className="navbar__collapsed__text" as={Link} to="/login">Sign in</div>
      </div>
    );
}

export default NotLoggedUser