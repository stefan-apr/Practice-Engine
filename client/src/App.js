import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import "./style.css";


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
    this.setState({
      loggedIn: true,
      username: username
    });
  }
  
  renderRedirect = () => {
    return <Redirect to='/' />
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
            <p>{this.state.loggedIn 
              ? (<div className="loggedIn-area">
                  <p className="user-name">Hi, {this.state.username}</p>
                  <span><a className="logoutbtn" onClick={this.logOut}>Log Out</a></span>
                </div>) 
              : <a className="signIn-area" href="/signIn">Sign in</a>}</p>
            
            <Switch>
              {/* https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path */}
              <Route exact path="/" render={props =>
                                              <div>
                                                <Problems />
                                              </div>
                                            } />
              <Route exact path="/problems" component={Problems} />
              <Route exact path="/problems/:id" component={Problem} />
              <Route exact path="/signup" render={(props) => <SignUp {...props} updateLogin={this.updateLogin}/>} />
              <Route exact path="/signIn" render={(props) => <SignIn {...props} updateLogin={this.updateLogin}/>} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>    
    );
  }
}

export default App;
