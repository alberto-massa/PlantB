import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import AuthService from "../../../../services/auth.service";


const LoggedUser = (props) => {

        const authService = new AuthService();
        const logout = () => {
        authService
            .logout()
            .then(() => props.storeUser(null))
            .catch((err) => console.log(err));
  
        };

return(
        <Container>

            <Nav.Link as={ Link } to="/">Home</Nav.Link>
            <Nav.Link as={ Link} to="/" onClick={ logout }>Logout</Nav.Link>
            <Nav.Link as={ Link } to="/new-plant">New Plant</Nav.Link>
            <Nav.Link as={ Link } to="/new-comment">New Comment</Nav.Link>
            <Nav.Link as={ Link } to="/new-message">New Message</Nav.Link>
            <Nav.Link as={ Link } to={ `/${ props.loggedUser.username }` }>My profile</Nav.Link>
            
        </Container>
)

}

export default LoggedUser