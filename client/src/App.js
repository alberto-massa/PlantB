import './App.css';
import { Component } from "react";
// import AuthService from "./services/auth.service";
// import Switch from "react-bootstrap/esm/Switch";
// import { Route } from "react-router";
import Navigation from "./components/layout/Navigation/Navigation";

class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     loggedUser: undefined
  //   }
  //   this.authService = new AuthService()
  // }

  // componentDidMount = () => {
  //   this.fetchUser()
  // }

  // storeUser = (user) => this.setState({ loggedUser: user })
  // fetchUser = () => {
  //   this.authService.isloggedin()
  //     .then(res => this.storeUser(res.data))
  //     .catch(err => this.storeUser(null))
  // }
  
  render  = () => {
    return (
      <>
        <Navigation
          // loggedUser={this.state.loggedUser}
          // storeUser={this.storeUser}
        />
      </>
    );
  }
};

export default App;