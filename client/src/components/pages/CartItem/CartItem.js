import './CartItem.css'
import { Link }  from 'react-router-dom'
import { ListGroupItem } from 'react-bootstrap'
import { useState } from 'react'
import CartService from '../../../services/cart.service'
import { useEffect } from 'react'

const cartService = new CartService()

const CartItem = ({ userCart, history }) => {

  
  const [userItems, setUserItems] = useState("")
  // console.log(userCart._id)
  const [itemId, setId] = useState("")
  

  useEffect(()=> {
    setId(userCart?._id)

  }, [userCart])

  const removeItem = (userCart, id ) => {
    console.log(id)

    cartService
        .removeItem(userCart, id)
        .then(res => {
          console.log("element just drop off the cart.", res)
          history.push("/plants")
        })
        .catch(err => console.log(err))
  }
  
    return (
      <>
     {userCart?.items.map(el =>{
       return(
         <>
        <div className="cart">
        <div className="cartitem__image"><img src={el.image} alt="User " /></div>

        <Link to={`/product/${111}`} className="cartitem__name">
          <p>{el.name}</p>
        </Link>
        {el.description.type && (
          <>
            <ListGroupItem>
              Type: {el.description.type}
            </ListGroupItem>
          </>
        )}
        {el.description.size && (
          <>
            <ListGroupItem>
              Size: {el.description.size}
            </ListGroupItem>
          </>
        )}
        {el.description.temperature && (
          <>
            <ListGroupItem>
              Temperature: {el.description.temperature}
            </ListGroupItem>
          </>
        )}
        {el.description.watering && (
          <>
            <ListGroupItem>
              Watering: {el.description.watering}
            </ListGroupItem>
          </>
          
        )}
        <button onClick={ () => removeItem(userCart._id, el._id) }>
            <i className="fas fa-trash">Remove Item </i>
        </button>
        
      </div>
      </>
       )
     })
     }
     </>
    );
}

export default CartItem
