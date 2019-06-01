import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: ''
    };
    
    this.updateLogin = this.updateLogin.bind(this);
  }

  updateLogin = (username) => {
    alert("Welcome back " + username);
    this.setState({
      loggedIn: true,
      username: username
    });
  }
  
  logOut = () => {
    alert("You have successfully logged out")
    this.setState({
      loggedIn: false,
      username: ''
    })
  }

  render(){
    return (
        <Router>
          <div>
            <Nav />
            <Switch>
              <p>{this.state.loggedIn 
                  ? (<div>
                      {this.state.username}
                      <button onClick={this.logOut}>Log Out</button>
                    </div>) 
                  : <a href="/signIn">Login</a>}</p>
            </Switch>
            <Switch>
              {/* https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path */}
              <Route exact path="/" component={Problems} />
              <Route exact path="/problems" component={Problems} />
              <Route exact path="/problems/:id" component={Problem} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signIn" render={(props) => <SignIn {...props} updateLogin={this.updateLogin}/>} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>    
    );
  }
}

export default App;
