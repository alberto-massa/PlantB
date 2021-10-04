import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthService from "../../../../services/auth.service";


const LoggedUser = (props) => {

        const authService = new AuthService();
        const logout = () => {
        authService
            .logout()
            .then(() => props.storeUser(null))
            .catch((err) => console.log(err));
  
        };

return (
  // <Container>

  //     <Nav.Link as={ Link } to="/">Home</Nav.Link>
  //     <Nav.Link as={ Link} to="/" onClick={ logout }>Logout</Nav.Link>
  //     <Nav.Link as={ Link } to="/new-plant">New Plant</Nav.Link>
  //     <Nav.Link as={ Link } to="/new-comment">New Comment</Nav.Link>
  //     <Nav.Link as={ Link } to="/new-message">New Message</Nav.Link>
  //     <Nav.Link as={ Link } to={ `/${ props.loggedUser.username }` }>My profile</Nav.Link>

  // </Container>
  <NavDropdown
    title={
      <Navbar.Text>
        Welcome,
        <a href="#/"> {props.loggedUser.username} </a>
        <img
          alt="user avatar"
          className="navbar__avatar rounded-circle"
          src={props.loggedUser.avatar}
        />
      </Navbar.Text>
    }
    id="collasible-nav-dropdown"
  >
    <NavDropdown.Item as={Link} to={`/${props.loggedUser.username}`}>
      My profile
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/new-message">
      Send a message
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/new-plant">
      Add a plant
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/new-comment">
      Add a comment
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item as={Link} to="/" onClick={logout}>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
);

}

export default LoggedUser