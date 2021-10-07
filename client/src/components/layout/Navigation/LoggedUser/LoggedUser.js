import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthService from "../../../../services/auth.service";
import "./LoggedUser.css";

const LoggedUser = (props) => {
  const authService = new AuthService();

  const logout = () => {
    authService
      .logout()
      .then(() => props.storeUser(undefined))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavDropdown
        className="navbar__large"
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
        <NavDropdown.Item
          as={Link}
          to={`/message-list/${props.loggedUser._id}`}
        >
          Messages
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

      <div className="navbar__collapsed">
        <NavDropdown.Divider />
        <Nav.Link
          className="navbar__collapsed__text"
          as={Link}
          to={`/${props.loggedUser.username}`}
        >
          My profile
        </Nav.Link>
        <NavDropdown.Divider />
        <Nav.Link
          className="navbar__collapsed__text"
          as={Link}
          to={`/message-list/${props.loggedUser._id}`}
        >
          Messages
        </Nav.Link>
        <NavDropdown.Divider />
        <Nav.Link className="navbar__collapsed__text" as={Link} to="/new-plant">
          Sell a plant
        </Nav.Link>
        <NavDropdown.Divider />
        <Nav.Link
          className="navbar__collapsed__text"
          as={Link}
          to="/"
          onClick={logout}
        >
          Logout
        </Nav.Link>
      </div>
    </>
  );
};

export default LoggedUser;
