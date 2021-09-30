import { Switch, Route } from "react-router-dom";
import SignUp from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import PlantForm from "../pages/PlantForm/PlantForm";

const Routes = ({ storeUser, loggedUser }) => {
  return (
    <Switch>
      <Route exact path="/register" render={(props) => <SignUp {...props} />} />
      <Route
        exact
        path="/login"
        render={(props) => <Login storeUser={storeUser} {...props} />}
      />
      <Route
        exact
        path="/new-plant"
        render={(props) => <PlantForm {...props} loggedUser={loggedUser} />}
      />
    
    </Switch>
  );
};

export default Routes;
