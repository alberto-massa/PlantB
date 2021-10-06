import "./PlantsList.css"
import PlantService from "../../../services/plant.service";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import UserService from "../../../services/user.service";
import CartService from "../../../services/cart.service";


const PlantsList = (props) => {
  
     const plantService = new PlantService();
     const userService = new UserService();
     const cartService = new CartService();

     const [plantsList, setPlantsList] = useState([]);
     const [user, setUser] = useState("")

     console.log(user)

     useEffect(() => {
        plantService
            .getPlants()
            .then((plants) => {
                setPlantsList(plants.data)
            })
            .catch((err) => console.log("Error while trying to get plants list", err))
    }, []);

    useEffect(() => {

      setUser(props.loggedUser)

    }, [props.loggedUser])
    
    
    const addToCart = (plant) => {
      // userService
      //       .getUser(user)
      //       .then((users) => {
      //         // console.log(user);
      //         console.log(users)
      //         })
      //       

      cartService
          .editCart({id: user.cart, items: plant })
          .then(res => {

              console.log("esto es res",res)

          })
          .catch((err) => console.log(err));

      // plantService
      //       .getPlant(plant)
      //       .then(plant =>{

      //         console.log("esto es plant",plant.data.plant._id)

      //       })
      //       .catch(err => console.log(err))

      

    };

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
                          className="btn btn-success rounded-pill"
                        >See details</Link>
                      </Col>
                      <Col className="d-flex justify-content-center" xs={12} sm={12} lg={6} >
                      <Link to={`/plants/${user}`}>
                          <button onClick={() => addToCart(plant._id)} className="btn btn-outline-success rounded-pill" type="submit"><FaShoppingCart/> Add to cart</button>
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