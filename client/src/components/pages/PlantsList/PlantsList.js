import "./PlantsList.css"
import PlantService from "../../../services/plant.service";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const PlantsList = (props) => {

     const [plantsList, setPlantsList] = useState([]);

     useEffect(() => {
        const plantService = new PlantService();
        plantService
            .getPlants()
            .then((plants) => {
                setPlantsList(plants.data)
            })
            .catch((err) => console.log("Error while trying to get plants list", err))
    }, []);

    return (
      <>
        {plantsList ? (
          <Container className="plantslist">
            <h1 className="text-center">Latest plants</h1>
            <Row>
              {plantsList.map((plant) => {
                return (
                  <Col xs={12} sm={6} lg={4}>
                    <div className="plantslist_imagecontainer">
                      <img alt="plant's pic" src={plant.image} />
                    </div>
                    <p>{plant.name}</p>
                    <p>{plant.price}€</p>
                    <Row>
                      <Col xs={12} sm={12} lg={6} className="d-flex justify-content-center">
                        <Link
                          to={`/plant/${plant._id}`}
                          className="btn btn-success"
                        >See details</Link>
                      </Col>
                      <Col xs={12} sm={12} lg={6} className="d-flex justify-content-center">
                        <Link className="btn btn-outline-success">
                          <FaShoppingCart/> Add to cart
                        </Link>
                      </Col>
                    </Row>
                    <hr className="mt-5 mb-5" />
                  </Col>
                );
              })}
            </Row>
          </Container>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
}

export default PlantsList