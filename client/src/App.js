import "./App.css";
import Routes from "./components/routes";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import Navigation from "./components/layout/Navigation/Navigation";

const authService = new AuthService();

const App = () => {

  const storeUser = (user) => setLoggedUser(user);
  const [loggedUser, setLoggedUser] = useState(undefined);

  const [refreshTotal, setRefreshTotal] = useState(false);

  useEffect(() => console.log(refreshTotal))

  useEffect(() => {
    if (loggedUser !== undefined) return;

    const fetchUser = () => {
      authService
        .isloggedin()
        .then((res) => storeUser(res.data))
        .catch(() => storeUser(null));
    };
    fetchUser();
  }, [loggedUser]);

  return (
    <>
      <Navigation loggedUser={loggedUser} storeUser={storeUser} refreshTotal={refreshTotal} />

      {loggedUser !== undefined ? (
        <Routes storeUser={storeUser} loggedUser={loggedUser} refreshTotal={() => setRefreshTotal(!refreshTotal)}/>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
