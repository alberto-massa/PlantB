import { Switch, Route } from "react-router-dom";
import SignUp from "../pages/Signup/Signup";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/register" render={(props) => <SignUp {...props} />} />
    </Switch>
  );
};

export default Routes;
