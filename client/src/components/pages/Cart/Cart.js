import './Cart.css'
import CartItem from './../CartItem/CartItem'

const Cart = () => {
    return (
      <div className="cart">
        <div className="cart__left">
          <h2>Shopping cart</h2>

          <CartItem />
        </div>
        <div className="cart__right">
          <div className="cart__info">
            <p>Subtotal (0) items</p>
            <p>3 euros</p>
          </div>
          <div>
              <button>Proceed to checkout</button>
          </div>
        </div>
      </div>
    );
}

export default Cart
