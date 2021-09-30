import "./App.css";
import { Component } from "react";
import Navigation from "./components/layout/Navigation/Navigation";
import Routes from "./components/routes";
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(){
      super()
      this.state = {
        loggedUser: null
      }
      this.authService = new AuthService()
  }

  componentDidMount = () => this.fetchUser()

  storeUser = (user) => this.setState({ loggedUser: user });

  fetchUser = () => {
    this.authService.isloggedin()
      .then(res => this.storeUser(res.data))
      .catch(err => this.storeUser(null))
  }

  render = () => {
    return (
      <>
        <Navigation storeUser={this.storeUser}/>
        <Routes loggedUser={this.state.loggedUser} storeUser={this.storeUser} />
      </>
    );
  };
}

export default App;
