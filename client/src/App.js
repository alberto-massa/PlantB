import "./App.css";
import Routes from "./components/routes";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import Navigation from "./components/layout/Navigation/Navigation";

const authService = new AuthService();

const App = () => {

  const storeUser = (user) => setLoggedUser(user);
  const [loggedUser, setLoggedUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = () => {
      authService
        .isloggedin()
        .then((res) => storeUser(res.data))
        .catch(() => storeUser(null));
    };
    fetchUser();
  }, []);
  
  return (
    <>
      <Navigation loggedUser={loggedUser} storeUser={storeUser} />
      {loggedUser !== undefined ?
      (
        <Routes storeUser={storeUser} loggedUser={loggedUser} />
      )
      :
      (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
