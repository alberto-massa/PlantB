import axios from "axios";

class InvoiceService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/invoice`,
    });
  }

  getInvoice = (id) => this.instance.get(`/${id}`);
  createInvoice = (invoice) => this.instance.post("/", invoice);
  // editInvoice = (id) => this.instance.put(`/${id}`);
}

export default InvoiceService;
