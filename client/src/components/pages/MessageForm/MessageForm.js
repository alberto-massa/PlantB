import React, { useState } from "react";
import MessageService from "./../../../services/message.service";
import { Button, Form } from "react-bootstrap";

const messageService = new MessageService();

const MessageForm = (props) => {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
  
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

    const authorId = props.loggedUser;
    
    messageService
      .createMessage({ content, subject, authorId })
      .then(() => {
        clearState();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Send a message </h1>
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

export default MessageForm;
