import { useState } from "react"
import { Button, Container, Modal, Row, Spinner } from "react-bootstrap"
import SendMessage from "../../SendMessage/SendMessage"
import "./MessageForm.css"


const MessageForm = (props) => {

  const { seller } = props
  const { loggedUser } = props
  
    const [showForm,setShowForm] = useState(false)

    const openModal = () => {
        setShowForm(true)
    }

    const closeModal = () => {
        setShowForm(false)
    }

    return (
      <Container className="d-flex justify-content-center">
        <Button
          variant="success"
          block
          className="rounded-pill"
          onClick={() => openModal()}
          style={{fontSize: "12px"}}
        >
          Send a Message
        </Button>

        <Modal show={showForm} onHide={() => closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title className="modal__title">What would you like to say?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SendMessage
              loggedUser={loggedUser}
              seller={seller}
              closeModal={() => closeModal()}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );

}

export default MessageForm