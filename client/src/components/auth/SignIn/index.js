import React, { Component } from "react";
import API from "../../../utils/API";

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
        API.validateInfo(this.state.username)
            .then((res) => {if (res.data.password === this.state.password) 
                                { 
                                    alert("Welcome back " + res.data.username);
                                    this.props.updateLogin(res.data.username);
                                    this.props.history.push("/");
                                } else 
                                { alert("login failed") } 
                            });
    }

    render() {
        return (
            <div className="container">
                <h4>Sign In</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input onChange={this.handleChange} type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <p><a href="/signup">Sign up</a></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }

}

export default SignIn;