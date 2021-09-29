import "./App.css";
import { Component } from "react";
import Navigation from "./components/layout/Navigation/Navigation";
import Routes from "./components/routes";

class App extends Component {
  
  storeUser = (user) => this.setState({ loggedUser: user });

  render = () => {
    return (
      <>
        <Navigation storeUser={this.storeUser}/>
        <Routes storeUser={this.storeUser} />
      </>
    );
  };
}

export default App;
