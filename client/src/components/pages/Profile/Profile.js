import { Container } from "react-bootstrap";

const Profile = (loggedUser) => {
    console.log(loggedUser);


    
  return (
    <Container>
      <h1>{loggedUser.username}</h1>
    </Container>
  );
};

export default Profile;
