import "./App.css";
import { useState, useEffect } from "react";
import Navigation from "./components/layout/Navigation/Navigation";
import Routes from "./components/routes";
import AuthService from "./services/auth.service";

const authService = new AuthService();

const App = () => {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const storeUser = (user) => setLoggedUser(user);

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
