import React, { useState } from "react";
import CommentService from "../../../services/comment.service";
import { Button, Form } from "react-bootstrap";

const commentService = new CommentService();

const CommentForm = (props) => {
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(0)

    const clearState = () => {
        setContent("")
        setRating(0)
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
            .catch((err) => console.log(err, 'jgfkjhgkjghj'))
    }

    return (
      <>
        <Form onSubmit={handleSubmit}>
          <h1>Add a comment </h1>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Review this seller</Form.Label>

            <Form.Control
              onChange={(e) => handleChange(e)}
              name="rating"
              value={rating}
              type="number"
              placeholder="Your comment goes here"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Additional info:</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              name="content"
              value={content}
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