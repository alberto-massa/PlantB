import "./App.css";
import { useState, useEffect } from "react";
import Navigation from "./components/layout/Navigation/Navigation";
import Routes from "./components/routes";
import AuthService from "./services/auth.service";

const authService = new AuthService();

const App = () => {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const storeUser = (user) => setLoggedUser(user);

  const fetchUser = () => {
    authService
      .isloggedin()
      .then((res) => storeUser(res.data))
      .catch(() => storeUser(null));
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <>
      <Navigation loggedUser={loggedUser} storeUser={storeUser}/>
      <Routes storeUser={storeUser} loggedUser={loggedUser}/>
    </>
  );
}

export default App;
