import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Cookies from "js-cookie";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {Cookies.get("user") ? <Home /> : <Login />}
          </Route>
          <Route path="/login">
            {Cookies.get("user") ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {Cookies.get("user") ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/forgot-password" component={Forgot} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
