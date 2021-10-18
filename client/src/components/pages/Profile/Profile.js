import {  Col, Row, Button, Container, Form, Spinner } from "react-bootstrap";
import "./Profile.css"
import React, {useState } from "react";
import UserService from "./../../../services/user.service"
import UploadService from "./../../../services/upload.service"


const userService = new UserService();
const uploadService = new UploadService();

const Profile = ({ props, loggedUser }) => {

  const [username, setUsername] = useState(loggedUser.username);
  const [avatar, setAvatar] = useState(loggedUser.avatar);
  const [email, setEmail] = useState(loggedUser.email);
  const [address, setAddress] = useState(loggedUser.address);
  const [isLoading, setIsLoading] = useState(false);

  const clearState = () => {
    setUsername("");
    setAvatar("");
    setEmail("");
    setAddress("");
  };

  const handleChange = (e) => {

    let { value, name } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "avatar":
        setAvatar(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
    }
  };

  const handleSubmitUpdate = (e) => {

    e.preventDefault();

    console.log({
      username,
      avatar,
      email,
      address,
    });

    userService
      .editUser(loggedUser._id, {
        username,
        avatar,
        email,
        address,
      })
      .then((res) => {
        console.log(res)
        clearState();
      })
      .catch((err) => console.error(err));
  };

  const handleFile = (e) => {
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);

    uploadService
      .uploadImg(uploadData)
      .then((res) => {
        setIsLoading(false);
        setAvatar(res.data.cloudinary_url);
      })
      .catch((err) => alert("Error, image not uploaded "));
  };

  return (
    <>
      {loggedUser ? (
        <>
          <Container className="profile">
            <Row className="mt-5 d-flex justify-content-center">
              <Col className="profile__col" xs={8} sm={8} lg={6}>
                <h1 className="text-center mt-2 mb-3">Edit your profile</h1>
                <Form onSubmit={handleSubmitUpdate}>
                  <Form.Group className="mb-3 text-center" controlId="avatar">
                    <img
                      className="signup__avatar rounded-circle"
                      alt="default avatar"
                      src={avatar}
                    />
                    <Form.Label className="btn btn-outline-success rounded-pill">
                      Change picture
                    </Form.Label>

                    <Form.Control
                      className="form-control-hide"
                      name="avatar"
                      onChange={(e) => handleFile(e)}
                      type="file"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="username"
                      value={username}
                      type="text"
                      placeholder={loggedUser.username}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={email}
                      type="text"
                      placeholder={loggedUser.email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Address </Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="address"
                      type="text"
                      placeholder={loggedUser.address}
                    />
                  </Form.Group>

                  {isLoading && <Spinner animtion="border" variant="success" />}
                  
                  <div className="d-grid gap-2">
                    <Button
                      disabled={isLoading}
                      variant="success"
                      type="submit"
                      className="rounded-pill mb-3 mt-2 justify-content-center"
                    >
                      {isLoading ? "Loading..." : "Submit changes"}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
