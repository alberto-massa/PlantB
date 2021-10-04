import { useState } from "react"
import { Button, Container, Modal, Row, Spinner } from "react-bootstrap"
import SendMessage from "../../SendMessage/SendMessage"




const MessageForm = ({id}) => {


    const [showForm,setShowForm] = useState(false)
    // const [message, setMessage] = useState("")

    const openModal = () => {

        setShowForm(true)

    }

    const closeModal = () => {

        setShowForm(false)

    }

    // const handleChange = (e) => {

    //     const { value } = e.target

    //     setMessage(value)

    // } 

    return(

        <Container>
        <>
        <Button block className="mt-2" onClick={() => openModal()}>Go ahead and send a message</Button>

        <Modal show={showForm} onHide={() => closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>What would you like to say?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SendMessage id={id} closeModal={() => closeModal()} />
          </Modal.Body>
        </Modal>
        <Row className="mt-4">
          {
            //this.displayCoasters()
          }
        </Row>
      </>
      :
      <Spinner />
      </Container>

    )

}

export default MessageForm