import React, { Component } from "react";
import "./style.css";

class Login extends Component{
    constructor(props){
        super(props);
        
        this.state={
            username:'',
            password:''
        }
       
    }

    render() {
        return (
            <div className="login">
                <p>hi im login comp</p>
            </div>
        )
    }
}

export default Login;