import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import PlantService from "../../../services/plant.service";
import UploadService from "../../../services/upload.service";

const plantService = new PlantService();
const uploadService = new UploadService();

const PlantForm = (props) => {

  const [ size, setSize ] = useState("");
  const [ type, setType ] = useState("");
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ image, setImage ] = useState("");
  const [ toxic, setToxic ] = useState(false);
  const [ location, setLocation ] = useState([]);
  const [ watering, setWatering ] = useState("");
  const [ temperature, setTemperature ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);


  const clearState = () => {

    setPrice(0);
    setSize("");
    setType("");
    setName("");
    setImage("");
    setToxic(false);
    setLocation([]);
    setWatering("");
    setTemperature(0);
  };

  const handleChange = (e) => {

    let newValue = [ ...location ];
    let { value, name, type } = e.target;

    if (name === "location" && e.target.checked) {
      newValue.push(value);
    }

    if (name === "location" && !e.target.checked) {
      newValue.splice(newValue.indexOf(value), 1);
    }

    type === "radio" && (value === "true" ? (value = true) : (value = false));

    switch (name) {

        case "name":
          setName(value);
          break;

        case "avatar":
          setImage(value);
          break;

        case "size":
          setSize(value);
          break;

        case "type":
          setType(value);
          break;

        case "toxic":
          setToxic(value);
          break;

        case "location":
          setLocation(newValue);
          break;

        case "price":
          setPrice(value);
          break;

        case "temperature":
          setTemperature(value);
          break;

        case "watering":
          setWatering(value);
          break;

        default:
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    plantService
      .createPlant({
        name,
        image,
        description: { size, type, toxic, location, temperature, watering },
        sellerId: props.loggedUser,
        price,
      })
      .then(() => {
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
        setImage(res.data.cloudinary_url);
      })
      .catch((err) => alert("Error, image not uploaded "));
  };

  return (
    <>
      <h1 className="text-center mt-2 mb-3"> Sell a plant </h1>
      <Form onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="name"
            value={ name }
            type="text"
            placeholder="Plant's name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label> Image: </Form.Label>
          <Form.Control
            onChange={ (e) => handleFile(e) }
            name="image"
            type="file"
            placeholder="Plant's image"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="size">
          <Form.Label> Size: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="size"
            value={ size }
            type="text"
            placeholder="Plant's sizes"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">
          <Form.Label> Type: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="type"
            value={ type }
            type="text"
            placeholder="Plant's type"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="toxic">
          <Form.Label> Is it toxic for animals? </Form.Label>
          { [ "radio" ].map((type) => (
            <div key={ `inline-${ type }` }>
              <Form.Check
                inline
                label="Yes"
                name="toxic"
                type="radio"
                id={ `inline-${ type }-1` }
                value={ true }
                onChange={ (e) => handleChange(e) }
              />
              <Form.Check
                inline
                label="No"
                name="toxic"
                type="radio"
                id={ `inline-${ type }-2` }
                value={ false }
                onChange={ (e) => handleChange(e) }
              />
            </div>
          )) }
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label >Location? </Form.Label>
          {  [  "checkbox"  ].map((type) => (
            <div key={  `inline-${  type  }`  } className="mb-3">
              <Form.Check
                inline
                label="Indoors"
                name="location"
                type={  type  }
                id={  `inline-${ type }-1`  }
                onChange={  (e) => handleChange(e)  }
                value="Indoors"
              />
              <Form.Check
                inline
                label="Outdoors"
                name="location"
                type={  type  }
                id={  `inline-${ type }-2`  }
                onChange={  (e) => handleChange(e)  }
                value="Outdoors"
              />
            </div>
          ))  }
        </Form.Group>

        <Form.Group className="mb-3" controlId="temperature">
          <Form.Label> Temperature: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="temperature"
            value={ temperature }
            type="number"
            placeholder="Temperature"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="watering">
          <Form.Label> Watering: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="watering"
            value={ watering }
            type="text"
            placeholder="Watering"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label> Price: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="price"
            value={ price }
            type="number"
            placeholder="Price"
          />
          €
        </Form.Group>

        { isLoading && <Spinner animtion="border" variant="success" /> }

        <Button disabled={ isLoading } variant="primary" type="submit">
          { isLoading ? "Loading..." : "Submit" }
        </Button>
      </Form>
    </>
  );
};

export default PlantForm;
