import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse'
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Leaderboard from "../components/Leaderboard"

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

class Problems extends Component {

  state = {
    problems: [],
    categories: [],
    open: false,
    shown: {}
  };

  componentDidMount() {
    this.loadProblems();
  }

  loadProblems = () => {
    let cats = [];
    let show = {};
    API.getProblems()
      .then(res => {
        for(let i = 0; i < res.data.length; i++) {
          if(cats.indexOf(res.data[i].category) === -1) {
            cats.push(res.data[i].category);
          }
        }
        for(let i = 0; i < cats.length; i++) {
          show[cats[i]] = false;
        }
        this.setState({problems: res.data, categories: cats, shown: show});
        }   
      )
      .catch(err => console.log(err));
  };

  toggle(category) {
    this.setState({
         shown: {
             ...this.state.shown,
             [category]: !this.state.shown[category]
         }
     })
  }

  render() {
    const {shown} = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h2>Problems:</h2><br></br>
              <h3>Click on a category to see its available problems.</h3>
            </Jumbotron>
            {this.state.problems.length ? (
             <List>
               {this.state.categories.map(category => (
                 <div key={category}
                 onClick={() => this.toggle(category)}
                 aria-controls={"collapse-" + category}
                 aria-expanded={shown[category]}>

                 <ListItem key={category}>
                   <h4>{category}</h4>
                   <Collapse in={this.state.shown[category]}>
                    <ul id={"collapse-" + category} className="problem-list-shell">
                      {this.state.problems.map(problem => (
                        problem.category === category ? <li key={problem._id} className="problem-list-item-pass"><Link to={"/problems/" + problem._id}><h5>{problem.title}</h5></Link></li> : ""
                      ))}
                    </ul>
                   </Collapse>
                 </ListItem>
                 </div>
               ))}
             </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Leaderboard />
      </Container>
    );
  }
}

export default Problems;
