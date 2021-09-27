import axios from "axios";

class CheckoutService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/checkout`,
    });
  }

  getCheckout = (id) => this.instance.get(`/${id}`);
  createCheckout = (checkout) => this.instance.post("/", checkout);
}

export default CheckoutService;
