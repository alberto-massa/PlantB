import './CartItem.css'
import { Link }  from 'react-router-dom'

const CartItem = (props) => {

  const { userCart } = props
  console.log(userCart)
  
    return (
      <>
<<<<<<< HEAD
     {/* {userCart?.items.map(el =>{
=======
     {userCart?.items.map(el =>{
>>>>>>> 4b692db0449980763be960f0caf7d8bca8405ff9
       return(
         <>
        <div className="cart">
        <div className="cartitem__image"><img src={el.image} alt="User " /></div>

        <Link to={`/product/${111}`} className="cartitem__name">
          <p>{el.name}</p>
        </Link>
        <p className="cartitem__price">Size: {el.description.size}</p>
        <p className="cartitem__price">Type: {el.description.type}</p>
<<<<<<< HEAD
        <p className="cartitem__price">temperature: {el.description.temperature}</p>
        <p className="cartitem__price">watering: {el.description.watering}</p>
=======
        <p className="cartitem__price">Temperature: {el.description.temperature}</p>
        <p className="cartitem__price">Watering: {el.description.watering}</p>
>>>>>>> 4b692db0449980763be960f0caf7d8bca8405ff9
        
        {/* <select className="cartitem__select">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4">4</option>
        </select> */}

        <button className="cartitem__deletebtn">
            <i className="fas fa-trash"></i>
        </button>
      </div>
      </>
       )
<<<<<<< HEAD
     })} */}
     </>
    )
=======
     })
     }
     </>
    );
>>>>>>> 4b692db0449980763be960f0caf7d8bca8405ff9
}

export default CartItem
