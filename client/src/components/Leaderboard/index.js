import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
/* import { Col, Row, Container } from "../Grid"; */

class Leaderboard extends Component {

  state = {
    topArr: []
  };

  loadTop() {
    console.log("run loadtop from Leadboard comp")
    API.getTopUsers()
       .then(res => {
         this.setState({
           topArr: res.data
         })
       }     
    );
  }

  componentDidMount(){
    this.loadTop();
  }
  
  render() {
    console.log("state when rendering: ", this.state.topArr)
    return (
      <div>
        <table class="table table-sm leaderboard">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.topArr.map((user) => (
              <tr>
                <th scope="row">{this.state.topArr.indexOf(user) + 1}</th>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Leaderboard;
