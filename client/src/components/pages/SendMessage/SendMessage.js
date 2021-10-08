import React, { useEffect, useState } from "react";
import MessageService from "../../../services/message.service";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../../App.css"
import "./SendMessage.css"


const messageService = new MessageService();

const SendMessage = ({seller, loggedUser}) => {


  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("")
  const [address, setAddress] = useState("")
  const [avatar, setAvatar] = useState("")
  const [plantSellerId, setPlantSellerId] = useState(undefined)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")



  useEffect(() => {
    const getOneUser = (seller) => {

      setUsername(seller?.username)
      setAddress(seller?.address)
      setAvatar(seller?.avatar)
      setPlantSellerId(seller?._id)

    }

    getOneUser(seller)
  }, [seller])

  useEffect(() => {
    setUsername(seller?.username)
    setAddress(seller?.address)
    setAvatar(seller?.avatar)
    setPlantSellerId(seller?._id)
    
  }, [seller, loggedUser])

  const clearState = () => {
    setSubject("");
    setContent("");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "content":
        setContent(value);
        break;
      case "subject":
        setSubject(value);
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const authorId = loggedUser._id;
    const receiverId = plantSellerId
    messageService
      .createMessage({ content, subject, authorId, receiverId })
      .then((res) => {
        clearState();
        setTimeout(() => setSuccess(undefined),2500)
      })
      .catch((err) => {
        setTimeout(() => setError(undefined),2500)
        console.log(err)
      });
  };

  return (
    <>
      <Form className="container send__message" onSubmit={handleSubmit}>
        <Row className="justify-content-center d-flex">
          <h6 className="text-center">
            Send a message to {username} <img src={avatar} alt="User " />
          </h6>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject:* </Form.Label>

            <Form.Control
              className="rounded-pill"
              onChange={(e) => handleChange(e)}
              name="subject"
              value={subject}
              type="text"
              placeholder="Subject"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Message:* </Form.Label>
            <Form.Control
              className="rounded-pill"
              onChange={(e) => handleChange(e)}
              name="content"
              value={content}
              type="text"
              placeholder="Type here your message"
            />
          </Form.Group>

          <Button className="rounded-pill mt-3" variant="success" type="submit">
            Submit
          </Button>
          {error && <p id="errorMessage">{error}</p>}
          {success && <p id="successMessage">{success}</p>}
        </Row>
      </Form>
    </>
  );
};

export default SendMessage;
