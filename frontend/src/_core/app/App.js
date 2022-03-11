import 'bulma/css/bulma.min.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import SignIn from '../authentification/component/sign-in/SignIn';
import SignUp from "../authentification/component/sign-up/SignUp";

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>

          <Route path="/signin">
            <SignIn/>
          </Route>

          <Route path="/signup">
            <SignUp/>
          </Route>

          <Route path="/">
            <Redirect from="/" to="/signin"/>
          </Route>

        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
