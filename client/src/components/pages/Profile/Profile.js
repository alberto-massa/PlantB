import { Col, Container, Row } from "react-bootstrap";
import "./Profile.css"


const Profile = ({ loggedUser }) => {

  return (
    <>
      {loggedUser ? (
        <Container className="profile">
          <Row className="d-flex justify-content-center">
            <Col className="profile__col" xs={10} sm={8} lg={6}>
              <h1 className="text-center">{loggedUser.username}</h1>
              <p className="text-center">{loggedUser.role}</p>
              <div className="text-center">
                <img
                  className="rounded-circle center-block"
                  alt={`${loggedUser.username}'s avatar`}
                  src={loggedUser.avatar}
                />
              </div>

              <p >{loggedUser.email}</p>
              <p className="text-center">{loggedUser.address}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
