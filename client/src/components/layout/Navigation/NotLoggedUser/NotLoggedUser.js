import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";



 const NotLoggedUser = (props) => {


    return(

    <Container>
    
        <Nav.Link as={ Link } to="/">Home</Nav.Link>
        <Nav.Link as={ Link } to="/login">Login</Nav.Link>
        <Nav.Link as={ Link } to="/register">Register</Nav.Link>
     
    </Container>

    )
}

export default NotLoggedUser