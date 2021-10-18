import { useState } from "react"
import { Button, Container, Modal } from "react-bootstrap"
import SendComment from "./SendComment/SendComment"

const CommentForm = (props) => {

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
          className="mt-2 mb-5 rounded-pill"
          onClick={() => openModal()}
        >
          Comment to {seller.username}
        </Button>

        <Modal show={showForm} onHide={() => closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title className="modal__title">What would you like to say?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SendComment
              loggedUser={loggedUser}
              seller={seller}
              closeModal={() => closeModal()}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );

}

export default CommentForm