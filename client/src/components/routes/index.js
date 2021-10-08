import Home from "./../pages/Home/Home"
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Profile from "./../pages/Profile/Profile";
import PlantForm from "../pages/PlantForm/PlantForm";
import { Switch, Route, Redirect } from "react-router-dom";
import CommentForm from "../pages/CommentForm/CommentForm";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import EditPlant from "../pages/PlantDetails/Editplant/Editplant";
import SendMessage from "../pages/SendMessage/SendMessage";
import PlantsList from "../pages/PlantsList/PlantsList";
import Cart from "../pages/Cart/Cart"

import MessageList from "../pages/messages/MessageList/MessageList";
import Checkout from "../pages/Checkout/Checkout";

const Routes = ({ storeUser, loggedUser }) => {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Home/> }/>
      <Route exact path="/new-plant" render={ (props) => loggedUser ? (<PlantForm { ...props } loggedUser={ loggedUser } />) : (<Redirect to="/login" />)}/>
      <Route exact path="/new-plant" render={ (props) => <PlantForm { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/checkout/:id" render={ (props) => loggedUser ? (<Checkout { ...props } loggedUser={ loggedUser } />) : (<Redirect to="/login" />)}/>
      <Route exact path="/new-comment" render={ (props) => loggedUser ? ( <CommentForm { ...props } loggedUser={ loggedUser } />) : (<Redirect to="/login" />)}/>
      <Route path="/new-message" render={ (props) => loggedUser ? ( <SendMessage { ...props } loggedUser={ loggedUser } />) : (<Redirect to="/login" />)}/>
      <Route exact path="/register" render={ (props) => <SignUp storeUser={ storeUser } { ...props } /> } />
      <Route exact path="/login" render={ (props) => <Login storeUser={ storeUser } { ...props } /> } />
      <Route exact path="/new-plant" render={ (props) => <PlantForm { ...props } loggedUser={ loggedUser } /> } />
      <Route path="/plant/:id" render={ (props) => <PlantDetails { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/new-comment" render={ (props) => <CommentForm { ...props } loggedUser={ loggedUser } /> } />
      <Route exact path="/login" render={ (props) => <Login storeUser={ storeUser } { ...props } /> } />
      <Route path="/edit-plant/:id" render={ (props) => <EditPlant { ...props } loggedUser={ loggedUser } /> } />
      <Route path="/plants" render={(props) => <PlantsList {...props} loggedUser={ loggedUser } /> }/>
      <Route path="/plants/:username" render={(props) => <PlantsList {...props} loggedUser={ loggedUser } /> }/>
      <Route path="/cart" render={(props) => <Cart {...props} loggedUser={ loggedUser }/>}/>
      <Route path="/message-list/:id" render={ (props) => <MessageList {...props} loggedUser={loggedUser}/>} />
        
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
