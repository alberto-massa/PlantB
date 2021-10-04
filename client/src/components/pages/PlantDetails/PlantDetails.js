import { useEffect, useState } from "react"
import PlantService from "../../../services/plant.service"
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap"
import RemoveItem from "./RemoveItem/RemoveItem"
import { Link } from "react-router-dom"
const { formatDate } = require("../../../utils/index")


const PlantDetails = (props, loggedUser) => {
  const plantService = new PlantService();
  const [plantsDetails, setPlantsDetails] = useState(undefined);
  const { id } = props.match.params;

  const getOnePlant = (id) => {
    console.log(id);

    plantService
      .getPlant(id)
      .then((plant) => {
        setPlantsDetails(plant.data.plant);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOnePlant(id);
  }, []);

  useEffect(() => {
    getOnePlant(id);
  }, [id]);

  return (
    <>
      {plantsDetails ? (
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={plantsDetails.image} />
            <Card.Body>
              <Card.Title>{plantsDetails.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Price:{plantsDetails.price}</ListGroupItem>
              <ListGroupItem>
                Size: {plantsDetails.description.size}
              </ListGroupItem>
              <ListGroupItem>
                Type: {plantsDetails.description.type}
              </ListGroupItem>
              <ListGroupItem>
                Toxic: {plantsDetails.description.toxic}
              </ListGroupItem>
              <ListGroupItem>
                Temperature: {plantsDetails.description.temperature}
              </ListGroupItem>
              <ListGroupItem>
                Watering: {plantsDetails.description.watering}
              </ListGroupItem>

              <div>
                <>
                  {props.loggedUser.role === "Admin" ? (
                    <RemoveItem id={id} {...props} />
                  ) : null}
                </>
              </div>

              <>
                {props.loggedUser ? (
                  <div>
                    <hr />

                    <Card.Img
                      variant="top"
                      src={plantsDetails.sellerId?.avatar}
                    />
                    <ListGroupItem>
                      <h3>Name: {plantsDetails.sellerId?.username}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                      <h4>Role: {plantsDetails.sellerId?.role}</h4>
                    </ListGroupItem>
                    <ListGroupItem>
                      Plantb user since:{" "}
                      {formatDate(plantsDetails.sellerId?.createdAt)}
                    </ListGroupItem>
                    <ListGroupItem>
                      Address: {plantsDetails.sellerId?.address}
                    </ListGroupItem>
                    <ListGroupItem>
                      Email: {plantsDetails.sellerId?.email}
                    </ListGroupItem>
                  </div>
                ) : (
                  <div>
                    <>
                      <p>Login in order to see our seller</p>
                    </>
                  </div>
                )}
              </>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PlantDetails;
