import PlantService from "../../../../services/plant.service"
import { Button, Form,  } from "react-bootstrap"

const RemoveItem = ({id}, props) =>{
    console.log('those are the props',props)

    const plantService = new PlantService();

    const removePlant = (id) => {

        // plantService
        //     .deletePlant(id)
        //     .then(res => console.log("this is the plant you just deleted",res))
        //     .catch(err => console.log("error on delete your plant", err))
            
           // props.history.push('/Home')
    
    }

    return(

        <Form onSubmit={removePlant(id)}>
        <Button  variant="primary" type="submit">
          Delete a plant
        </Button>
        </Form>

    )
}

export default RemoveItem