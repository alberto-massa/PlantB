import PlantService from "../../../../services/plant.service";
import { Button } from "react-bootstrap";

const RemoveItem = ({ id }, props) => {
  const plantService = new PlantService();

  const removePlant = (id) => {
    plantService
      .deletePlant(id)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => console.log("error on delete your plant", err));
  };

  return (
    <Button onClick={(id) => removePlant(id)} variant="danger" type="button">
      Delete plant
    </Button>
  );
};

export default RemoveItem;
