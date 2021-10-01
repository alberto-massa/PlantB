import React, { useState } from "react";
import CommentService from "../../../services/comment.service";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa"
import "./CommentForm.css"

const commentService = new CommentService();

const CommentForm = (props) => {
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

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
          <h1>Review this seller </h1>
          {[...Array(5)].map((star, idx) => {
            const ratingValue = idx + 1;

            return (
              <label key={idx}>
                <input
                  id="starRadio"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={(e) => handleChange(e)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Additional comment:</Form.Label>
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