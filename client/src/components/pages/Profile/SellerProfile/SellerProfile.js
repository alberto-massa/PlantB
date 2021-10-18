import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router"
import UserService from "../../../../services/user.service"
import PlantService from "../../../../services/plant.service"
import { Link } from "react-router-dom"
import CommentForm from "../../CommentForm/CommentForm"
const { formatDate } = require("../../../../utils/index")

const userService = new UserService()
const plantService = new PlantService()


const SellerProfile = (props) => {

    console.log(props)
    const { username } = props.match.params
    const [seller, setSeller] = useState('')
    const [plantsList, setPlantsList] = useState(undefined)

    useEffect(() => {
        userService
            .getUser(username)
            .then(user => {
                setSeller(user.data.user[0])
            })
            .catch(err => console.log(err))
    }, [username])

    useEffect(() => {
        plantService
            .getPlants()
            .then(plants => {
                setPlantsList(plants.data)
            })
            .catch(err => console.log(err))
    }, [username])

    const displayPlants = (seller, plantsList) => {

        const newList = plantsList?.filter(plant => plant.sellerId._id === seller._id)
        return (
        <Container>
            <Row>
            {newList?.map(plant => {
                return (
                
                    <Col xs={12} ms={6} lg={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={plant.image} />
                        <Card.Body>
                            <Card.Title>{plant.name}</Card.Title>
                            <Card.Text>
                                {plant.price}
                            </Card.Text>
                            <Link to={`/plant/${plant._id}`}>See details</Link>
                        </Card.Body>
                    </Card>
                   </Col>
                   
                )
            })
            }
            </Row>
        </Container>
        )
    }


    return (

        <>
            {seller &&

                <Card className="text-center">
                    <Card.Header>{seller.username}</Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={seller.avatar} />
                        <Card.Title>{seller.role}</Card.Title>
                        <Card.Text>
                            <p>Adress: {seller.address}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Age: {formatDate(seller.age)} </p>
                        </Card.Text>
                        <Card.Text>
                            <p>User since: {formatDate(seller.createdAt)}</p>
                        </Card.Text>
                        {displayPlants(seller, plantsList)}
                        <CommentForm {...props} seller={seller} />
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            }
        </>
    )


}

export default SellerProfile