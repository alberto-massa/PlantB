import axios from "axios";

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`,
      withCredentials: true,
    });
  }

  getUsers = () => this.instance.get("/");
  getUser = (id) => this.instance.get(`/${id}`);
  editUser = (id, plant) => this.instance.put(`/${id}`, plant);
  createUser = (user) => this.instance.post("/", user);
  deleteUSer = (id) => this.instance.delete(`/${id}`);
}

export default UserService;
