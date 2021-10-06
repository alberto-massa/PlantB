import React, { useEffect, useState } from "react";
import MessageService from "../../../services/message.service";
import { Button, Form } from "react-bootstrap";
import UserService from "../../../services/user.service"


const messageService = new MessageService();

const SendMessage = ({seller, loggedUser}) => {


  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("")
  const [address, setAddress] = useState("")
  const [avatar, setAvatar] = useState("")
  const [plantSellerId, setPlantSellerId] = useState(undefined)



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
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <img src={avatar} alt="User " />
        <h1>Send a message to {username} </h1>
        <h2>Address: {address}</h2>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject:* </Form.Label>

          <Form.Control
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
            onChange={(e) => handleChange(e)}
            name="content"
            value={content}
            type="text"
            placeholder="Type here your message"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SendMessage;
