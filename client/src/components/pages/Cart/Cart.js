import "./Cart.css";
import CartItem from "./../CartItem/CartItem";
import CartService from "../../../services/cart.service";
import { useEffect, useState } from "react";

const cartService = new CartService();

const Cart = (props) => {
  // console.log(props.loggedUser._id)
  // console.log(cart)
  const [userCart, setCart] = useState(undefined);
  const [id, setId] = useState("props");
  console.log("eso es el ID --------", id);
  console.log(userCart);

  useEffect(() => {
    setId(props.loggedUser.cart);
  }, [props.loggedUser]);

  useEffect(() => {
    cartService.getCart(id).then((cartFound) => {
      setCart(cartFound.data);
      console.log(cartFound.data);
    });
  }, [id]);

  return (
    <div className="cart">
      <div className="cart__left">
        <h2>Shopping cart</h2>

        <CartItem userCart={userCart} />
      </div>
      <div className="cart__right">
        <div className="cart__info">
          <p>Subtotal {userCart?.items.length} items</p>
          {/* <p>{userCart.items[0].price}</p> */}
        </div>
        <div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
