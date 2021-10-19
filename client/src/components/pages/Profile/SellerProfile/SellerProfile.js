import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router"
import UserService from "../../../../services/user.service"
import PlantService from "../../../../services/plant.service"
import CommentService from "../../../../services/comment.service"
import { Link } from "react-router-dom"
import CommentForm from "../../CommentForm/CommentForm"
const { formatDate } = require("../../../../utils/index")

const userService = new UserService()
const plantService = new PlantService()
const commentService = new CommentService()


const SellerProfile = (props) => {

    console.log(props.loggedUser)
    const { username } = props.match.params
    const [ seller, setSeller] = useState('')
    const [ plantsList, setPlantsList] = useState(undefined)
    const [ commentsList, setCommentsList ] = useState(undefined)
    const [ profileRating, setProfileRating ] = useState(undefined)
    const [ total, setTotal ] = useState(undefined)
    console.log(total)

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

        commentService
            .getComments()
            .then(comments => {       
                setCommentsList(comments.data)
            })
            .catch(err => console.log(err))
            resultRating(commentsList)
    }, [props])

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

    const displayComments = (commentsList) => {
        const newList = commentsList?.filter(comment => comment.userRef.username === username)
        
        return(
            <>
                {newList?.map(comment => {
                    
                    return(
                    <Card className="text-center">
                    <Card.Header>{comment.authorId.username}</Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={comment.authorId.avatar} />
                        <Card.Title>{comment.authorId.role}</Card.Title>
                        <Card.Text>
                        Rating: {comment.rating}
                        </Card.Text>
                        <Card.Text>
                        {comment.content}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                    <Card.Footer className="text-muted">Date: {formatDate(comment.createdAt)}</Card.Footer>
                    </Card>
                    )
                })}
                    
                </>
            )
    }

    const resultRating = (commentsList) => {
        const newList = commentsList?.filter(comment => comment.userRef.username === username)
        
            newList?.rating?.reduce((a,b) => {
                setTotal((a + b)/newList?.length)

            },0)
           
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
                        <Card.Text>
                            <p>Rating: {total}</p>
                        </Card.Text>
                        {displayPlants(seller, plantsList)}
                        <hr/>
                        {displayComments(commentsList)}
                        <CommentForm {...props} seller={seller} />
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            }
        </>
    )


}

export default SellerProfile