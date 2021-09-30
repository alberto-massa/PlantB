import React, { useState } from "react";
import CommentService from "./../../../services/Comment.service";
import { Button, Form } from "react-bootstrap";
import Rating from "react-rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

        switch(name) {
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

        commentService
            .createComment({content, rating})
            .then(() => {
                clearState()
            })
            .catch((err) => console.log(err))
    }

    return (
      <>
        <h1>Add a comment</h1>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content*: </Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e)}
            name="content"
            value={content}
            type="text"
            placeholder="Your comments goes here"
          />
        </Form.Group>

        <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
        />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Content*: </Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              name="rating"
              value={rating}
              type="number"
              placeholder="Your comments goes here"
            />
          </Form.Group>
          <Button>Submit</Button>
        </Form>
      </>
    );
}

export default CommentForm