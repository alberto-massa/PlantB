import axios from "axios";

class PlantService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/plant`,
    });
  }

  getPlants = () => this.instance.get("/");
  getPlant = (id) => this.instance.get(`/${id}`);
  createPlant = (plant) => this.instance.post("/", plant);
  deletePlant = (id) => this.instance.delete(`/${id}`);
  editPlant = (id) => this.instance.put(`/${id}`);
}

export default PlantService;