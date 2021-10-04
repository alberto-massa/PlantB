import PlantService from "../../../../services/plant.service"
import { Button, Container, Form,  } from "react-bootstrap"
import { Link } from "react-router-dom";

const RemoveItem = ({id}, props) =>{
    console.log('those are the props',props)

    const plantService = new PlantService();

    const removePlant = (id) => {

        plantService
            .deletePlant(id)
            .then(res => {
                
                console.log("this is the plant you just deleted",res)
                props.history.push('/')
                
            })
            .catch(err => console.log("error on delete your plant", err))
            
    
    }

    return(

        <Button onClick ={(id) => removePlant(id)}  variant="primary" type="button">
          Delete a plant
        </Button>
        

    )
}

export default RemoveItem