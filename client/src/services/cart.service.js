import axios from "axios";

class CartService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/cart`,
    });
  }

  getCart = (id) => this.instance.get(`/${id}`);
  createCart = (cart) => this.instance.post("/", cart);
  editCart = (id) => this.instance.put(`/${id}`);
}

export default CartService;
