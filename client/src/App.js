import './App.css';
import { Component } from "react";
import Navigation from "./components/layout/Navigation/Navigation";
import Routes from "./components/routes"

class App extends Component {
  
  render  = () => {
    return (
      <>
        <Navigation
          // loggedUser={this.state.loggedUser}
          // storeUser={this.storeUser}
        />
        <Routes/>
      </>
    );
  }
};

export default App;