import Home from "./../pages/Home/Home"
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Profile from "./../pages/Profile/Profile";
import PlantForm from "../pages/PlantForm/PlantForm";
import { Switch, Route, Redirect } from "react-router-dom";
import CommentForm from "../pages/CommentForm/CommentForm";
//import MessageForm from "../pages/SendMessage/SendMessage";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import EditPlant from "../pages/PlantDetails/Editplant/Editplant";
import SendMessage from "../pages/SendMessage/SendMessage";
import PlantsList from "../pages/PlantsList/PlantsList";

const Routes = ({ storeUser, loggedUser }) => {
  return (
    <Switch>

      <Route exact path="/" render={ (props) => <Home/> }/>

      <Route exact path="/new-plant" render={ (props) => loggedUser ? (<PlantForm { ...props } loggedUser={ loggedUser } />
          ) 
          : 
          (
            <Redirect to="/login" />
          )
        }
      />
      <Route exact path="/new-comment" render={ (props) => loggedUser ? ( <CommentForm { ...props } loggedUser={ loggedUser } />
          ) 
          : 
          (
            <Redirect to="/login" />
          )
        }
      />
      <Route path="/new-message" render={ (props) => loggedUser ? ( <SendMessage { ...props } loggedUser={ loggedUser } />
          ) 
          : 
          (
            <Redirect to="/login" />
          )
        }
      />

      <Route exact path="/register" render={ (props) => <SignUp { ...props } /> } />
      <Route exact path="/login" render={ (props) => <Login storeUser={ storeUser } { ...props } /> } />
      <Route exact path="/new-plant" render={ (props) => <PlantForm { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/plant/:id" render={ (props) => <PlantDetails { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/new-comment" render={ (props) => <CommentForm { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/login" render={ (props) => <Login storeUser={ storeUser } { ...props } /> } />
      <Route path="/edit-plant/:id" render={ (props) => <EditPlant { ...props } loggedUser={ loggedUser } /> } />
      <Route path="/plants" render={(props) => <PlantsList {...props}/>}/>
        
      { loggedUser !== null ? (
        <Route path={ `/${loggedUser.username}` } render={(props) => <Profile { ...props } loggedUser={ loggedUser } /> } />
      ) 
      : 
      (
        <Route path="/" render={ () => <Redirect to="/login" /> } />
      )}

    </Switch>
  );
};

export default Routes;
