import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import PlantService from "../../../services/plant.service";

export default class PlantForm extends Component {
  state = {
    name: "",
    image: "",
    description: {
      size: "",
      type: "",
      toxic: false,
      location: "",
      temperature: 0,
      watering: "",
    },
  //BUYERID AND SELLERID?
    price: 0,
  };

  plantService = new PlantService();

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.plantService
      .createPlant(this.state)
      .then(() => {
        this.props.closeModal();
        this.props.refreshPlants();
        this.setState({
          name: "",
          image: "",
          description: {
            size: "",
            type: "",
            toxic: false,
            location: "",
            temperature: 0,
            watering: "",
          },
          price: 0,
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            onChange={(e) => this.handleChange(e)}
            name="name"
            value={this.state.name}
            type="text"
            placeholder="Plant's name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image: </Form.Label>
          <Form.Control
            onChange={(e) => this.handleChange(e)}
            name="image"
            value={this.state.image}
            type="text"
            placeholder="Plant's image"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          {/* to add: 
           description: {
            size: "",
            type: "",
            toxic: false,
            location: "",
            temperature: 0,
            watering: "",
          }, */}
          <Form.Label>Description: </Form.Label>
          <Form.Control
            onChange={(e) => this.handleChange(e)}
            name="description"
            value={this.state.description}
            type="text"
            placeholder="Plant's description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price: </Form.Label>
          <Form.Control
            onChange={(e) => this.handleChange(e)}
            name="price"
            value={this.state.price}
            type="number"
            placeholder="Price"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
