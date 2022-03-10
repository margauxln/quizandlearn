import 'bulma/css/bulma.min.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "../authentification/component/login/Login";
import SignUp from "../authentification/component/sign-up/SignUp";

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/signup">
            <SignUp/>
          </Route>

          <Route path="/">
            <Redirect from="/" to="/login"/>
          </Route>

        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
