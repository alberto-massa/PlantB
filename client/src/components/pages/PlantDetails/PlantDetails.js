import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PlantService from "../../../services/plant.service";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import RemoveItem from "./RemoveItem/RemoveItem";
import MessageForm from "./MessageForm/MessageForm";
import "./PlantDetails.css";
import { FaStar } from "react-icons/fa";

const PlantDetails = (props) => {
  const plantService = new PlantService();
  const [plantsDetails, setPlantsDetails] = useState(undefined);
  const { id } = props.match.params;
  const [user, setUser] = useState({});

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
    plantsDetails || getOnePlant(id);
  }, [props]);

  return (
    <>
    {plantsDetails ? (

        <Container className="plant__details">
          <Row className="d-flex justify-content-between">

            <Col xs={12} sm={12} lg={4} className="d-flex justify-content-center mt-3 mt-lg-5">
              <p>{plantsDetails.sellerId.username} &nbsp;</p>          
              <p className="seller__role__text">
                ({plantsDetails.sellerId.role}) &nbsp;
              </p>

              {/* TODO stars below are representative, should work on seller average */}
              <FaStar color={"#ffc107"} /> 
              <FaStar color={"#ffc107"} />
              <FaStar color={"#ffc107"} />
              <FaStar color={"#ffc107"} />
              <FaStar/>
              {/* ------------------------ */}

            </Col>

            <Col xs={12} sm={12} lg={4} className="d-flex justify-content-center mt-lg-4">
              <MessageForm {...props} seller={plantsDetails.sellerId}/>
            </Col>

              {console.log(plantsDetails.sellerId)}


            <Col xs={12} className="d-flex justify-content-center mt-3 plant__details__img ">
              <img alt="product" src={plantsDetails.image} />
            </Col>  
          </Row>

          <Row className="mt-5">
              <h1 className="margin__left pr-3">{plantsDetails.price} €</h1>
          </Row>
          <Row className="mt-2">
            <h4 className="margin__left">{plantsDetails.name}</h4>
          </Row>

          <hr className="plantdetails__hr"/>

        
          <Row className="d-flex justify-content-start plantdetails__description">

            {plantsDetails.description.type ? (
              <Col xs={12} className="d-flex justify-content-start">
                <p>Type: &nbsp;</p>
                <p>{plantsDetails.description.type}</p>
              </Col>
              ) : null
            }

            {plantsDetails.description.size ? (
              <Col xs={12} className="d-flex justify-content-start">
                <p>Size: &nbsp;</p>
                <p>{plantsDetails.description.size}</p>
              </Col>
              ) : null
            }

            {plantsDetails.description.toxic ? (
              <Col xs={12} className="d-flex justify-content-start">
                <p>Toxic for animals? : &nbsp;</p>
                {plantsDetails.description.toxic === true ? (
                  <p>yes</p>
                )
                : (
                  <p>no</p>
                )
                }
              </Col>
              ) : null
            }
            
            {plantsDetails.description.temperature ? (
              <Col xs={12} className="d-flex justify-content-start">
                <p>Temperature : &nbsp;</p>
                <p>{plantsDetails.description.temperature}</p>
              </Col>
              ) : null
            }

            {plantsDetails.description.watering ? (
            <Col xs={12} className="d-flex justify-content-start">
              <p>Watering : &nbsp;</p>
              <p>{plantsDetails.description.watering}</p>
            </Col>
            ) : (
              null
            )}
            
            {plantsDetails.description.temperature ? (
              <Col xs={12} className="d-flex justify-content-start">
                <p>Recommended temperature : &nbsp;</p>
                <p>{plantsDetails.description.temperature}</p>
              </Col>
              ) : null
            }


          </Row>
          
          <hr className="plantdetails__hr"/>

          <Row >
          <p className="text-center">Shipped within {plantsDetails.delivery} days from {plantsDetails.sellerId.address}</p>
          </Row>

        </Container>

        ) : (
      <Container className="justify-content-center d-flex mt-5">
        <Spinner variant="success" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
      )}
    </>

        /* <Row className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={plantsDetails.image} />
            <Card.Body>
              <Card.Title>{plantsDetails.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Price: {plantsDetails.price}€</ListGroupItem>
              {plantsDetails.sellerId.address && (
                <>
                  <ListGroupItem>
                    City: Madrid, Spain
                    {/* {plantsDetails.sellerId.address.split(",")} 
                  </ListGroupItem>
                </>
              )}
             
              {plantsDetails.description.watering && (
                <>
                  <ListGroupItem>
                    Watering: {plantsDetails.description.watering}
                  </ListGroupItem>
                </>
              )}
              {plantsDetails.delivery && (
                <>
                  <ListGroupItem>
                    Delivery time: {plantsDetails.delivery} days~
                  </ListGroupItem>
                  <br/>
                </>
              )}
              <div>
                <>
                  {props.loggedUser?.role === "Admin" && (
                    <RemoveItem id={id} {...props} />
                  )}
                </>
              </div>

              <div>
                <>
                  {props.loggedUser?._id === plantsDetails.sellerId._id && (
                    <Container>
                      <RemoveItem
                        sellerDetails={plantsDetails.sellerId}
                        {...props}
                      />
                      <Link
                        className=" btn btn-warning"
                        to={`/edit-plant/${id}`}
                      >
                        Edit plant
                      </Link>
                    </Container>
                  )}
                </>
              </div>

              {props.loggedUser ? (
                <br />
              ) : (
                <div>
                  <>
                    <p>
                      <Link to="/login">Login</Link> in order to see our seller
                    </p>
                  </>
                </div>
              )}
              <>
                {props.loggedUser &&
                  props.loggedUser?.username !==
                    plantsDetails.sellerId.username && (
                    <div>
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
                      <Card.Body>
                        <MessageForm
                          {...props}
                          seller={plantsDetails.sellerId}
                        />
                        {props.loggedUser && props.loggedUser.username !== plantsDetails.sellerId.username &&
                        <>
                        <Link to={`/sellerProfile/${plantsDetails.sellerId.username}`}>Profile of {plantsDetails.sellerId.username} </Link>
                        </>
                        
                        }
                      </Card.Body>
                    </div>
                  )}
              </>
            </ListGroup>
          </Card>
        </Row> */
     




    //{plantsDetails ? (
    //     <Row className="d-flex justify-content-center">
    //       <Card style={{ width: "18rem" }}>
    //         <Card.Img variant="top" src={plantsDetails.image} />
    //         <Card.Body>
    //           <Card.Title>{plantsDetails.name}</Card.Title>
    //           <Card.Text>
    //           {plantsDetails.description.type ? (<p>{plantsDetails.description.type}</p>) : (<p>*this seller did not add any description</p>)}
    //           </Card.Text>
    //         </Card.Body>
    //         <ListGroup className="list-group-flush">
    //           <ListGroupItem>Price: {plantsDetails.price}€</ListGroupItem>
    //           {plantsDetails.sellerId.address && (
    //             <>
    //               <ListGroupItem>
    //                 City: Madrid, Spain
    //                 {/* {plantsDetails.sellerId.address.split(",")} */}
    //               </ListGroupItem>
    //             </>
    //           )}
    //           {plantsDetails.description.size && (
    //             <>
    //               <ListGroupItem>
    //                 Size: {plantsDetails.description.size}
    //               </ListGroupItem>
    //             </>
    //           )}
    //           {plantsDetails.description.type && (
    //             <>
    //               <ListGroupItem>
    //                 Type: {plantsDetails.description.type}
    //               </ListGroupItem>
    //             </>
    //           )}
    //           {plantsDetails.description.toxic && (
    //             <>
    //             {plantsDetails.description.toxic === true ? (
    //               <ListGroupItem>
    //                 Toxic for animals: yes
    //               </ListGroupItem>
    //             )
    //             :
    //               <ListGroupItem>
    //                 Toxic for animals: no
    //               </ListGroupItem>
    //             }

    //             </>
    //           )}
    //           {plantsDetails.description.temperature > 0 && (
    //             <>
    //               <ListGroupItem>
    //                 Temperature: {plantsDetails.description.temperature}
    //               </ListGroupItem>
    //             </>
    //           )}
    //           {plantsDetails.description.watering && (
    //             <>
    //               <ListGroupItem>
    //                 Watering: {plantsDetails.description.watering}
    //               </ListGroupItem>
    //             </>
    //           )}
    //           {plantsDetails.delivery && (
    //             <>
    //               <ListGroupItem>
    //                 Delivery time: {plantsDetails.delivery} days~
    //               </ListGroupItem>
    //               <br/>
    //             </>
    //           )}
    //           <div>
    //             <>
    //               {props.loggedUser?.role === "Admin" && (
    //                 <RemoveItem id={id} {...props} />
    //               )}
    //             </>
    //           </div>

    //           <div>
    //             <>
    //               {props.loggedUser?._id === plantsDetails.sellerId._id && (
    //                 <Container>
    //                   <RemoveItem
    //                     sellerDetails={plantsDetails.sellerId}
    //                     {...props}
    //                   />
    //                   <Link
    //                     className=" btn btn-warning"
    //                     to={`/edit-plant/${id}`}
    //                   >
    //                     Edit plant
    //                   </Link>
    //                 </Container>
    //               )}
    //             </>
    //           </div>

    //           {props.loggedUser ? (
    //             <br />
    //           ) : (
    //             <div>
    //               <>
    //                 <p className="text-center">
    //                   <Link to="/login">Login</Link> in order to see our seller
    //                 </p>
    //               </>
    //             </div>
    //           )}
    //           <>
    //             {props.loggedUser &&
    //               props.loggedUser?.username !==
    //                 plantsDetails.sellerId.username && (
    //                 <div>
    //                   <Card.Img
    //                     variant="top"
    //                     src={plantsDetails.sellerId?.avatar}
    //                   />
    //                   <ListGroupItem>
    //                     <h3>Name: {plantsDetails.sellerId?.username}</h3>
    //                   </ListGroupItem>
    //                   <ListGroupItem>
    //                     <h4>Role: {plantsDetails.sellerId?.role}</h4>
    //                   </ListGroupItem>
    //                   <Card.Body>
    //                     <MessageForm
    //                       {...props}
    //                       seller={plantsDetails.sellerId}
    //                     />
    //                     {props.loggedUser && props.loggedUser.username !== plantsDetails.sellerId.username &&
    //                     <>
    //                     <Link to={`/sellerProfile/${plantsDetails.sellerId.username}`}>Profile of {plantsDetails.sellerId.username} </Link>
    //                     </>

    //                     }
    //                   </Card.Body>
    //                 </div>
    //               )}
    //           </>
    //         </ListGroup>
    //       </Card>
    //     </Row>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </Container>
    
  );
};

export default PlantDetails;
