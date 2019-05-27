import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path */}
          <Route exact path="/" component={Problems} />
          <Route exact path="/problems" component={Problems} />
          <Route exact path="/problems/:id" component={Problem} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signIn" component={SignIn} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
