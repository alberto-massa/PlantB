import "./Cart.css";
import CartItem from "./../CartItem/CartItem";
import CartService from "../../../services/cart.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cartService = new CartService();

const Cart = (props) => {
  const [userCart, setCart] = useState(undefined);
  const [id, setId] = useState("props");
  console.log(userCart);

  useEffect(() => {
    setId(props.loggedUser.cart);
  }, [props.loggedUser]);

  useEffect(() => {
    cartService.getCart(id).then((cartFound) => {
      setCart(cartFound.data);
    });
  }, [id]);

  const totalPrice = (userCart) => {
    let price = userCart?.items.reduce((a, b) => a + b.price, 0);

    return <p>{price}&#8364;</p>;
  };

  useEffect(() => {
    totalPrice(userCart);
  }, []);

  return (
    <div className="cart">
      <div className="cart__left">
        <h2>Shopping cart</h2>

        <CartItem userCart={userCart} {...props} />
      </div>
      <div className="cart__right">
        <div className="cart__info">
          <p>Subtotal {userCart?.items.length} items</p>
          <p>{totalPrice(userCart)}</p>
        </div>
        <div>
        <Link to={`/checkout/${userCart?._id}`}>
          <button>Proceed to checkout</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
