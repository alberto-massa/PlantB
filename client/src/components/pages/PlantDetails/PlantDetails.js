import { useEffect, useState } from "react"
import PlantService from "../../../services/plant.service"
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap"
import RemoveItem from "./RemoveItem/RemoveItem"
import { Link } from "react-router-dom"
import EditPlant from "./Editplant/Editplant"
import MessageForm from "./MessageForm/MessageForm"
const { formatDate } = require("../../../utils/index")


const PlantDetails = (props) => {
  const plantService = new PlantService();
  const [plantsDetails, setPlantsDetails] = useState(undefined);
  const { id } = props.match.params;
  // const user = plantsDetails.sellerId
  const [user, setUser] = useState({})
  

  const getOnePlant = (id) => {
    plantService
      .getPlant(id)
      .then((plant) => {
        return setPlantsDetails(plant.data.plant);
      })
      .then(() => setUser(plantsDetails?.sellerId))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOnePlant(id);
  }, []);

  useEffect(() => {
    getOnePlant(id);
  }, [props]);

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
                  {props.loggedUser?.role === "Admin" && <RemoveItem id={id} {...props} />}
                </>
              </div>

              <div>
                <>
                  {props.loggedUser?._id === plantsDetails.sellerId._id &&
                   
                   <Container>
                        <RemoveItem sellerDetails={plantsDetails.sellerId} {...props} />
                        <Link className="btn bg-success" to={`/edit-plant/${id}`}>
                            Edit plant
                        </Link>
                    </Container>}
                </>
              </div>

                    {props.loggedUser ? (

                      <h2> Hello {props.loggedUser.username} </h2>
                    ) : (
                      <div>
                        <>
                          <p><Link to="/login">Login</Link> in order to see our seller</p>
                        </>
                      </div>
                        )
                    }
              <>
                {props.loggedUser && props.loggedUser?.username !== plantsDetails.sellerId.username &&
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
                    {/* <ListGroupItem>
                      Plantb user since:{" "}
                      {formatDate(plantsDetails.sellerId?.createdAt)}
                    </ListGroupItem>
                    <ListGroupItem>
                      Address: {plantsDetails.sellerId?.address}
                    </ListGroupItem>
                    <ListGroupItem>
                      Email: {plantsDetails.sellerId?.email}
                    </ListGroupItem> */}
                    <Card.Body>
                    <MessageForm {...props} seller={plantsDetails.sellerId} />
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                  </div>
                }
              </>
            </ListGroup>         
          </Card>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PlantDetails;
