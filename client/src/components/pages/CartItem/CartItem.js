import './CartItem.css'
import { Link }  from 'react-router-dom'
import { Col, Container, ListGroupItem, Row } from 'react-bootstrap'
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
       return (
         <>
           <Container>
             <Row>
               <Col xs={2} sm={2} lg={2}>
                 <img
                   src={el.image}
                   alt="User "
                   className="cartitem__img"
                   style={{ width: "100%" }}
                 />
               </Col>
               <Col xs={2} sm={2} lg={2}>
                 <p className="text-center"><strong>{el.name}</strong></p>
                 <p className="text-center">{el.price}€</p>
               </Col>
               <Col xs={2} sm={2} lg={2}>
                 <h6 className="text-center">
                   <strong>Type</strong>
                 </h6>
                 {el.description.type ? (
                   <p className="text-center">{el.description.type}</p>
                 ) : (
                   <p className="text-center">no type description available</p>
                 )}
               </Col>
               <Col>
                 <h6 className="text-center">
                   <strong>Size</strong>
                 </h6>
                 {el.description.size ? (
                   <p className="text-center">{el.description.size}</p>
                 ) : (
                   <p className="text-center">no size information available</p>
                 )}
               </Col>
               <Col>
                 <h6 className="text-center">
                   <strong>Temperature</strong>
                 </h6>
                 {el.description.temperature ? (
                   <p className="text-center">{el.description.temperature}</p>
                 ) : (
                   <p className="text-center">
                     no temperature information available
                   </p>
                 )}
               </Col>
               <Col>
                 <h6 className="text-center">
                   <strong>Watering</strong>
                 </h6>
                 {el.description.temperature ? (
                   <p className="text-center">{el.description.watering}</p>
                 ) : (
                   <p className="text-center">
                     no watering information available
                   </p>
                 )}
               </Col>
             </Row>
             <div className="d-grid gap-2">
               <button
                 className="btn btn-danger mt-2"
                 onClick={() => removeItem(userCart._id, el._id)}
               >
                 <i className="fas fa-trash">Remove Item </i>
               </button>
             </div>
             <hr />
           </Container>
           {/* <div className="cart">
             <div className="cartitem__image">
               <img src={el.image} alt="User " />
             </div>

             <Link to={`/product/${111}`} className="cartitem__name">
               <p>{el.name}</p>
             </Link>
             {el.description.type && (
               <>
                 <ListGroupItem>Type: {el.description.type}</ListGroupItem>
               </>
             )}
             {el.description.size && (
               <>
                 <ListGroupItem>Size: {el.description.size}</ListGroupItem>
               </>
             )}
             {el.description.temperature > 0 && (
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
             <button onClick={() => removeItem(userCart._id, el._id)}>
               <i className="fas fa-trash">Remove Item </i>
             </button>
           </div> */}
         </>
       );
     })
     }
     </>
    );
}

export default CartItem
