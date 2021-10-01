import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import PlantForm from "../pages/PlantForm/PlantForm";
import CommentForm from "../pages/CommentForm/CommentForm";
import MessageForm from "../pages/MessageForm/MessageForm";
import Profile from "./../pages/Profile/Profile"

const Routes = ({ storeUser, loggedUser }) => {

  return (
    <Switch>
      <Route exact path="/new-plant" render={(props) => loggedUser ? <PlantForm {...props} loggedUser={loggedUser} /> : <Redirect to="/login"/> }/>
      <Route exact path="/new-comment" render={(props) => loggedUser ? <CommentForm {...props} loggedUser={loggedUser} /> : <Redirect to="/login"/>}/>
      <Route path="/new-message" render={(props) => loggedUser ? <MessageForm {...props} loggedUser={loggedUser} /> : <Redirect to="/login"/>}/>
      <Route exact path="/profile" render={(props) => loggedUser ? <Profile {...props} loggedUser={loggedUser} /> : <Redirect to="/login"/>}/>
      <Route exact path="/register" render={(props) => <SignUp {...props} />} />
      <Route exact path="/login" render={(props) => <Login storeUser={storeUser} {...props} />}/>
    </Switch>
  );
};

export default Routes;
