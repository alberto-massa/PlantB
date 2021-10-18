import axios from "axios";

class CartService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/cart`,
      withCredentials: true,
    });
  }

  getCart = (id) => this.instance.get(`/${id}`);
  createCart = (cart) => this.instance.post("/", cart);
  editCart = (id, plantId) => this.instance.put(`/${id}`, {plantId});
  removeItem = (id, plantId) => this.instance.put(`/delete/${id}`, {plantId});
}

export default CartService;
