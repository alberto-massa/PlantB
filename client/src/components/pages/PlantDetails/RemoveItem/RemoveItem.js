import PlantService from "../../../../services/plant.service"
import { Button } from "react-bootstrap"

const RemoveItem = ({id}, props) =>{
    console.log('those are the props',props)

    const plantService = new PlantService();

    const removePlant = (id) => {

        plantService
            .deletePlant(id)
            .then(res => {
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