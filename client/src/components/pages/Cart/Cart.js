import './Cart.css'
import CartItem from './../CartItem/CartItem'
import CartService from "../../../services/cart.service"
import { useEffect, useState } from 'react'

const Cart = (props) => {

  const cartService = new CartService() 
  const { cart } = props.loggedUser
  const [userCart, setCart] = useState(undefined)

  useEffect(() => {
    cartService
      .getCart(cart)
      .then(cartFound =>{
        setCart(cartFound.data)
        console.log(cartFound.data)
      })
  }, [props])


    return (

          <div className="cart">
        <div className="cart__left">
          <h2>Shopping cart</h2>

          <CartItem userCart={userCart} />
        </div>
        <div className="cart__right">
          <div className="cart__info">
            <p>Subtotal 0 items</p>
            {/* <p>{userCart.items[0].price}</p> */}
          </div>
          <div>
              <button>Proceed to checkout</button>
          </div>
        </div>
      </div>
    )
}

export default Cart

