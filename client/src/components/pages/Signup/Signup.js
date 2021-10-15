import React, { useState } from "react";
import AuthService from "./../../../services/auth.service";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import UploadService from "./../../../services/upload.service";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from "@geoapify/react-geocoder-autocomplete";

const { formatSignDate } = require("../../../utils/index");

const authService = new AuthService();
const uploadService = new UploadService();

const Signup = (props) => {

  const [ age, setAge ] = useState(0);
  const [ role, setRole ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ avatar, setAvatar ] = useState(
    "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-man-default-avatar-png-image_2813122.jpg"
  );

  const clearState = () => {
    
    setAge(0);
    setRole("");
    setEmail("");
    setAvatar("");
    setAddress("");
    setPassword("");
    setUsername("");
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

    authService
      .signup(username, password, email, address, age, tmp, avatar)
      .then(() => props.history.push("/"))
      .catch((err) => console.log(err));

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
    <Container>
      <Form onSubmit={ handleFormSubmit }>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label> Username </Form.Label>
          <Form.Control
            name="username"
            value={ username }
            onChange={ (e) => handleChange(e) }
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            name="password"
            value={ password }
            onChange={ (e) => handleChange(e) }
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Email </Form.Label>
          <Form.Control
            name="email"
            value={ email }
            onChange={ (e) => handleChange(e) }
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label> Address </Form.Label>
          <GeoapifyContext apiKey={ process.env.REACT_APP_API_KEY_GEO }>
            <GeoapifyGeocoderAutocomplete
              className="form-control"
              placeholder="Enter address here"
              value={ address }
              onChange={ (e) => handleChange(e) }
              name="address"
              lang={ "en" }
              type="text"
              placeSelect={ (place) => {
                setAddress(
                  `${ place.properties.address_line1 }, ${ place.properties.address_line2 }`
                );
              } }
            />
          </GeoapifyContext>
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label> Date of Birth </Form.Label>
          <Form.Control
            name="age"
            value={ age }
            max={ formatSignDate() }
            onChange={ (e) => handleChange(e) }
            type="date"
            placeholder="Age"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="role">
          <Form.Label> Are you a company? </Form.Label>
          { ["radio"].map((type) => (
            <div key={ `inline-${type}` }>
              <Form.Check
                inline
                label="Yes"
                name="role"
                type="radio"
                id={`inline-${type}-1` }
                value={ true }
                onChange={ (e) => handleChange(e) }
              />
              <Form.Check
                defaultChecked
                inline
                label="No"
                name="role"
                type="radio"
                id={ `inline-${type}-2` }
                value={ false }
                onChange={ (e) => handleChange(e) }
              />
            </div>
          )) }
        </Form.Group>

        <Form.Group className="mb-3" controlId="avatar">
          <Form.Label> Avatar </Form.Label>
          <Form.Control
            name="avatar"
            onChange={ (e) => handleFile(e) }
            type="file"
          />
        </Form.Group>

        { isLoading && <Spinner animation="border" variant="success" /> }

        <Button disabled={isLoading} variant="primary" type="submit">
          { isLoading ? "Loading..." : "Submit" }
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
