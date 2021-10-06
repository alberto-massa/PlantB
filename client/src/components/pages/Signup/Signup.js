// import AuthService from "./../../../services/auth.service";
import React, { useState } from "react";
import { Container, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import UploadService from "./../../../services/upload.service";
import avatar_img from "./../../../default-avatar.svg";
import "./Signup.css"
import CartService from "./../../../services/cart.service"
import Autocomplete from "react-google-autocomplete";

const { formatSignDate } = require("../../../utils/index");

// const authService = new AuthService();
const uploadService = new UploadService();
const cartService = new CartService();

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(
    "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-man-default-avatar-png-image_2813122.jpg"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState(null)
  const [user, setUser] = useState("")

  const clearState = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setAddress("");
    setAge(0);
    setRole("");
    setAvatar("");
  };

  

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    type === "radio" && (value === "true" ? (value = true) : (value = false));

    switch (name) {
      case "username":
        setUsername(value);
        break;

      case "password":
        setPassword(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "address":
        setAddress(value);
        break;

      case "age":
        setAge(value);
        break;

      case "role":
        setRole(value);
        break;

      case "avatar":
        setAvatar(value);
        break;

      default:
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let tmp = "";
    role ? (tmp = "Shop") : (tmp = "User");

    cartService
      .createCart({ total: 0 }, { buyer: user })
      .then((cart) => {
        setCartId(cart._id);
      })
      .catch((err) => console.log(err));


    // authService
    //   .signup(username, password, email, address, age, tmp, avatar)
    //   .then((user) => {
    //     setUser(user._id)
    //     console.log(user._id)
    //     props.history.push("/")})
    //   .catch((err) => console.log(err));


        // authService
        //   .signup(username, password, email, address, age, tmp, avatar)
        //   .then((user) => {
        //     // setUser(user._id);
        //     // console.log(user._id);
        //     props.history.push("/");
        //     return cartService.createCart({ total: 0 }, { buyer: user });
        //   });
        //   .then(cart =>)
        



    clearState();
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
      .catch((err) => alert("Error, image not uploaded"));
  };

  return (
    <Container className="signup">
      <Row className="mt-3 d-flex justify-content-center">
        <Col xs={6} sm={8} lg={6}>
          <Row>
            <Form.Group className="mb-3 text-center" controlId="avatar">
              <img alt="default avatar" src={avatar_img} />
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
          </Row>

          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username*</Form.Label>
              <Form.Control
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                type="email"
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address*</Form.Label>
              <Autocomplete
                className="form-control"
                apiKey={process.env.REACT_APP_API_KEY_MAPS}
                options={{
                  types: ["address"],
                  // fields: ["(formatted_address)"],
                  // componentRestrictions: { country: "es" },
                }}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address*</Form.Label>
              <GeoapifyContext apiKey={process.env.REACT_APP_API_KEY_GEO}>
                <GeoapifyGeocoderAutocomplete
                  className="form-control"
                  placeholder="Enter address here"
                  value={address}
                  onChange={(e) => handleChange(e)}
                  name="address"
                  lang={"en"}
                  placeSelect={(place) => {
                    setAddress(
                      `${place.properties.address_line1}, ${place.properties.address_line2}`
                    );
                  }}
                />
              </GeoapifyContext>

            </Form.Group> */}
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Date of Birth*</Form.Label>
              <Form.Control
                name="age"
                value={age}
                max={formatSignDate()}
                onChange={(e) => handleChange(e)}
                type="date"
                placeholder="Age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Are you a company?</Form.Label>
              <div key={`inline-radio`}>
                <Form.Check
                  inline
                  label="Yes"
                  name="role"
                  type="radio"
                  id={`inline-radio-1`}
                  value={true}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Check
                  defaultChecked
                  inline
                  label="No"
                  name="role"
                  type="radio"
                  id={`inline-radio-2`}
                  value={false}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </Form.Group>
            {isLoading && <Spinner animation="border" variant="success" />}
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
