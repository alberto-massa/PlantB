import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

//Style in LoggedUser.css

 const NotLoggedUser = () => {

    return (
      <>
        <Nav.Link className="navbar__large navbar__large__text" as={Link} to="/login">
          Sign in
        </Nav.Link>

        <div className="navbar__collapsed">
          <NavDropdown.Divider />
          <Nav.Link className="navbar__collapsed__text" as={Link} to="/login">
            Sign in
          </Nav.Link>
        </div>
      </>
    );
}

export default NotLoggedUser