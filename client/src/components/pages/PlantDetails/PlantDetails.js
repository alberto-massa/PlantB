import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import PlantService from "../../../services/plant.service"
import { Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap"
const { formatDate } = require("../../../utils/index")


const PlantDetails = (props) => {

    const { id } = props.match.params    
    const [ plantsDetails, setPlantsDetails ] = useState(undefined)

    useEffect(() => {

        const plantService = new PlantService();

        const getOnePlant = (id) => {
            plantService
                .getPlant(id)
                .then(plant => {
                    setPlantsDetails(plant.data.plant)
                })
                .catch(err => console.log(err))
        }

        getOnePlant(id)
    }, [])

    return (
        <>
            { plantsDetails ?
                (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={ plantsDetails.image } />
                            <Card.Body>
                                <Card.Title>{ plantsDetails.name }</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Price:{ plantsDetails.price}</ListGroupItem>
                                <ListGroupItem>Size: { plantsDetails.description.size }</ListGroupItem>
                                <ListGroupItem>Type: { plantsDetails.description.type }</ListGroupItem>
                                <ListGroupItem>Toxic: { plantsDetails.description.toxic }</ListGroupItem>
                                <ListGroupItem>Temperature: { plantsDetails.description.temperature }</ListGroupItem>
                                <ListGroupItem>Watering: { plantsDetails.description.watering }</ListGroupItem>
                                <>
                                { props.loggedUser ? 
                                (
                                <div>
                                <hr/>
                                
                                    <Card.Img variant="top" src={ plantsDetails.sellerId?.avatar } />
                                    <ListGroupItem><h3> Name: { plantsDetails.sellerId?.username } </h3></ListGroupItem>
                                    <ListGroupItem><h4> Role: { plantsDetails.sellerId?.role } </h4></ListGroupItem>
                                    <ListGroupItem> Plantb user since: { formatDate(plantsDetails.sellerId?.createdAt) } </ListGroupItem>
                                    <ListGroupItem> Address: { plantsDetails.sellerId?.address } </ListGroupItem>
                                    <ListGroupItem> Email: { plantsDetails.sellerId?.email } </ListGroupItem>
                                </div>
                                )
                                :
                                (
                                    <div>
                                        <p><Link to="/login"> Login </Link> in order to see our seller </p>
                                    </div>
                                )
                                }
                                </>
                            </ListGroup>
                        </Card>
                    </div>
                )
                :
                (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"> Loading... </span>
                    </Spinner>
                )
            }
        </>
    )
}

export default PlantDetails