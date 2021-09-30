import axios from "axios";

class MessageService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/message`,
      withCredentials: true,
    });
  }

  getMessages = () => this.instance.get("/");
  getMessage = (id) => this.instance.get(`/${id}`);
  createMessage = (message) => this.instance.post("/", message);
  deleteMessage = (id) => this.instance.delete(`/${id}`);
}

export default MessageService;
