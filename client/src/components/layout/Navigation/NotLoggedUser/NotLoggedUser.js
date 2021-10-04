import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";



 const NotLoggedUser = (props) => {

    return (
      <Nav.Link as={Link} to="/login">
        Sign in
      </Nav.Link>
    );
}

export default NotLoggedUser