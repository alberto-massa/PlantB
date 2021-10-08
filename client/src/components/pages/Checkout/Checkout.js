import { useEffect } from "react";
import { useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import CartService from "../../../services/cart.service";
import PlantService from "../../../services/plant.service";

const cartService = new CartService()
const plantService = new PlantService()

const Checkout = (props) => {

  const [userCart, setCart] = useState(undefined);
  const [userSeller, setSeller] = useState("");
  const [cartId, setId] = useState("");
  const [plants, setPlants] = useState([]);
  const [plantSellerId, setPlantSellerId] = useState([]);
  const [cartSellerId, setCartSellerId] = useState("");


  console.log("esto es cartSellerId", cartSellerId)
  console.log("esto es plants seller id", plantSellerId)


  useEffect(() => {
    plantService.getPlants().then((plantFound) => {
      setPlants(plantFound.data)
    });
    // displayCheckout(userCart, plants)
  }, [cartId]);


  useEffect(() => {
    setId(props.loggedUser.cart);
  }, [props.loggedUser]);

  useEffect(() => {
    cartService.getCart(cartId).then((cartFound) => {
      setCart(cartFound.data);

    });
  }, []);


  //       ellerId:
  // address: "Gran Via 2, Madrid, Spain"
  // age: "2021-09-22T00:00:00.000Z"
  // avatar: "https://res.cloudinary.com/dubhsyrde/image/upload/v1633342742/jkifxclbzlpfrkowxbh4.png"
  // cart: "615ad52953cb83366a8a823c"
  // createdAt: "2021-09-28T15:51:56.129Z"
  // email: "popino@popino.com"
  // password: "$2b$10$/CoaY5vswSGmVDeW.qJowe5jMFhZrEMTX6uH6jpww7RzBzdZ4k3oe"
  // role: "User"
  // updatedAt: "2021-10-05T15:03:55.526Z"
  // username: "Popino"
  // validated: false
  // __v: 0
  // _id: "61533a1c72c01d78e05e7e90"


  return (
    <>
      <h1 className="mt-5 text-center">Redirect to your Bank account website...</h1>
    </>
  )
}

export default Checkout