/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import MessageService from "../../../../services/message.service"
import MessageForm from "../../PlantDetails/MessageForm/MessageForm"
import "./MessageList.css"

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


    return (
    <>
      <Container className="messages__container d-flex justify-content-center">
        <Row className="justify-content-center d-flex">
            {message?.map((el) => {
            return (
              <>
                {loggedUser._id === el.receiverId ? (
                  <>
                    <Col className="message__card m-2" xs={11} sm={5} lg={3}>
                      <Row className="mt-2">
                        <Col xs={6} sm={6} lg={6}>
                          <img
                            className="messages__avatar"
                            src={el.authorId.avatar}
                            alt="User "
                          />
                        </Col>
                        <Col>
                          <h6><strong>{el.authorId.username}</strong></h6>
                          <p>on <strong>{formatDate(el.createdAt)}</strong></p>
                        </Col>
                        <hr/>
                      </Row>

                      <p><strong>Subject:</strong> {el.subject}</p>
                      <hr/>
                      <p>{el.content}</p>
                      <div className="d-grid gap-2">
                        <MessageForm {...props} seller={el.authorId} />
                      </div>
                    </Col>
                  </>
                ) : null}
              </>
            );
            })}
        </Row>  
     </Container>
     <p className="no__message">No more messages found</p>
     </>
    );

}

export default MessageList

{/* <Card className="text-center">
                    <Card.Header>
                      <img src={el.authorId.avatar} width="40px" alt="User " />
                      {el.authorId.username}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{el.subject}</Card.Title>
                      <Card.Text>{el.content}</Card.Text>
                      <MessageForm {...props} seller={el.authorId} />
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {formatDate(el.createdAt)}
                    </Card.Footer>
                  </Card> */}