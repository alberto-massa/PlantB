import axios from "axios";

class CommentService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/comment`,
      withCredentials: true,
    });
  }

  getComments = () => this.instance.get("/");
  getComment = (id) => this.instance.get(`/${id}`);
  deleteComment = (id) => this.instance.delete(`/${id}`);
  createComment = (comment) => this.instance.post("/", comment);
}

export default CommentService;
