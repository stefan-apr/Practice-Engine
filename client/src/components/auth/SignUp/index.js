import React, { Component } from "react";

class SignUp extends Component {

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
        console.log(this.state);
    }

    render() {
        return (
            <div className="container">
                <h4>Sign Up</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input onChange={this.handleChange} type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }

}

export default SignUp;