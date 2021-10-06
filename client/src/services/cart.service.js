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
  editCart = (data) => this.instance.put(`/${data.id}`,data);
}

export default CartService;
