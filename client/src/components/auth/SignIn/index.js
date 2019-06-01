import React, { Component } from "react";
import API from "../../../utils/API";
import "./style.css";

class SignIn extends Component {

    state = {
        username: '',
        password: ''
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        API.getUser(this.state.username)
            .then((res) => {if (res.data.password === this.state.password) 
                                { 
                                    alert("Welcome back " + res.data.username);
                                    this.props.updateLogin(res.data.username, res.data.completed);
                                    //console.log("in sign in, the completed array is: ", res.data.completed)
                                    this.props.history.push("/");
                                } else 
                                { alert("login failed") } 
                            });
    }

    render() {
        return (
            <div className="container login-box">
                <h4>Sign In</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <p><a className="badge badge-light" href="/signup">Sign up</a></p>
                    <button type="submit" className="btn btn-outline-info">Sign In</button>
                </form>
            </div>

        )
    }

}

export default SignIn;