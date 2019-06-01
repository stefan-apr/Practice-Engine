import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Footer from "./components/Footer"
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: '',
      solved: []
    };
    
    this.updateLogin = this.updateLogin.bind(this);
  }

  updateLogin = (username, solvedArr) => {
    this.setState({
      loggedIn: true,
      username: username,
      solved: solvedArr
    });
    //console.log(this.state);
  }
  
  updateArr = (newArr) => {
    this.setState({
      solved: newArr
    });
  }

  renderRedirect = () => {
    return <Redirect to='/' />
  }

  logOut = () => {
    alert("You have successfully logged out")
    this.setState({
      loggedIn: false,
      username: '',
      solved: []
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
                                                <Problems {...props} 
                                                          currentUser={ this.state.username }
                                                          solvedArr={ this.state.solved }
                                                />
                                            } />
              <Route exact path="/problems/:id" render={(props) => <Problem {...props} 
                                                                              currentUser={ this.state.username }
                                                                              solvedArr={ this.state.solved }
                                                                              updateArr={ this.updateArr }
                                                                            />} />
              <Route exact path="/signup" render={(props) => <SignUp {...props} updateLogin={this.updateLogin}/>} />
              <Route exact path="/signIn" render={(props) => <SignIn {...props} updateLogin={this.updateLogin}/>} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Router>    
    );
  }
}

export default App;
