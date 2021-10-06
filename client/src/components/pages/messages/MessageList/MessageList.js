/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import MessageService from "../../../../services/message.service"
import MessageForm from "../../PlantDetails/MessageForm/MessageForm"
const { formatDate } = require("../../../../utils/index")


const MessageList = (props) => {
    const messageService = new MessageService()
    const [ message, setMessage] = useState(null)
    const { loggedUser } = props
    const { id } = props.match.params  
     
    const getMessages = (id) => {
        
        messageService
            .getMessages({authorId: id})
            .then(messages => {
                setMessage(messages?.data)
            })
            .catch(err => console.log(err))
        }

    useEffect(() => getMessages(), [getMessages, id])


    return(
        <>
            {message?.map(el =>{
            return(
                
                <Container>
                {loggedUser._id === el.receiverId &&
                
                    <Card className="text-center">
                    
                    <Card.Header><img src={el.authorId.avatar} width="40px" alt="User " />{ el.authorId.username }</Card.Header>
                    <Card.Body>
                        <Card.Title>{el.subject}</Card.Title>
                        <Card.Text>
                        {el.content}
                        </Card.Text>
                        <MessageForm {...props} seller={el.authorId} />
                    </Card.Body>
                    <Card.Footer className="text-muted">{formatDate(el.createdAt)}</Card.Footer>
                    </Card>                                
                
                }
                </Container>                
            )
        })}
        
        </>
    )

}

export default MessageList