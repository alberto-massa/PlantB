import "./PlantsList.css"
import PlantService from "../../../services/plant.service";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartService from "../../../services/cart.service";


const PlantsList = (props) => {
  
     const plantService = new PlantService();
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
    
    
    const addToCart = (plantId) => {   

      cartService
          .editCart(user.cart, plantId)
          .then(res => {
              console.log(res)
              props.refreshTotal();
          })
          .catch((err) => console.log(err));
    };

    return (
      <>
        {plantsList ? (
          <Container className="plantslist">
            <h1 className="text-center">Latest plants</h1>
            <Row >
              {plantsList.map((plant) => {
                return (
            
                    <Col as={Link} to={`/plant/${plant._id}`} className="plantslist__card d-flex justify-content-center" xs={12} sm={6} lg={3}>
                      <article>
                        <aside className="plantslist_imagecontainer">
                          <img alt="plant's pic" src={plant.image} />
                        </aside>
                        <h4>{plant.price}€</h4>
                        <h6>{plant.name}</h6>
                      </article>

                      
                      {/* TODO: ADD TO CART IN PLANT DETAILS */}
                      {/* <button onClick={() => addToCart(plant?._id)} className="btn btn-outline-success rounded-pill" type="submit"><FaShoppingCart/> Add to cart</button> */}
           

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