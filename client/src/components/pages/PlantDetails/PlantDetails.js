import { useEffect, useState } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import PlantService from "../../../services/plant.service"

const plantService = new PlantService()

const PlantDetails = (props) => {

    const [plantsDetails, setPlantsDetails] = useState({})
    
    const { id } = props.match.params
    
    const getOnePlant =  (id) => {
        
        plantService
        .getPlant(id)
        .then(plant => {
            //console.log(plant.data.plant)
            setPlantsDetails(plant.data.plant)
        })
        .catch(err => console.log(err))
    }
    console.log(getOnePlant(id))

    // useEffect((id) => {
    //     const plantService = new PlantService();
        
    //     plantService.getPlant(id).then(res => setPlantsDetails(res.data.plant))
        
    //   }, [])
    

    
    return(
        <div>
        {getOnePlant(id)}
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="#" />
        <Card.Body>
            {/* <Card.Title>{plantsDetails[0].name}</Card.Title> */}
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card>
        </div>
        )

}

export default PlantDetails