import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CommentService from "../../../services/comment.service";

const commentService = new CommentService();

const CommentForm = (props) => {

  const [ rating, setRating ] = useState(0)
  const [ content, setContent ] = useState("")

  const clearState = () => {
      setRating(0)
      setContent("")
  }

  const handleChange = (e) => {

      const {value, name} = e.target;

      switch (name) {

          case "content":
              setContent(value);
              break;

          case "rating":
              setRating(value);
              break;

          default:
      }
  }

  const handleSubmit = (e) => {

      e.preventDefault();

      const authorId = props.loggedUser;

      commentService
          .createComment({ content, rating, authorId })
          .then(() => {
              clearState()
          })
          .catch((err) => console.log(err, 'This is an error while you create a comment.'))
  }

  return (
    <>
      <Form onSubmit={ handleSubmit }>
        <h1> Add a comment </h1>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label> Review this seller </Form.Label>

          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="rating"
            value={ rating }
            type="number"
            placeholder="Your comment goes here"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label> Additional info: </Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="content"
            value={ content }
            type="text"
            placeholder="Your comment goes here"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CommentForm