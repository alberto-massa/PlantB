import { Container } from "react-bootstrap";

const Profile = ({ loggedUser }) => {

  return (
    <>
      {loggedUser ? 
        <Container> 
        <h1>{loggedUser.username}</h1>
        <p>{loggedUser.role}</p>
        <img alt={`${loggedUser.username}'s avatar`} src={loggedUser.avatar}/>
        <p>{loggedUser.email}</p>
        <p>{loggedUser.address}</p>
      </Container>
      :
      <p>Loading...</p>
      }
    </>
  );
};

export default Profile;
