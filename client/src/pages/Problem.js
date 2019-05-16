import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { TextArea, FormBtn } from "../components/Form";

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      userSolution: "",
      lastSolution: "",
      userTrials: [],
      solutionTrials: []
    };
  }
  
  // When this component mounts, grab the problem with the _id of this.props.match.params.id
  // e.g. localhost:3000/problems/599dcb67f0f16317844583fc
  componentDidMount() { 
    API.getProblem(this.props.match.params.id)
      .then(res => this.setState({ problem: res.data }))
      .then(() => this.setState({lastSolution: window.localStorage.getItem(this.state.problem.title)}))
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({lastSolution: null});
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    window.localStorage.setItem(this.state.problem.title, this.state.userSolution);
    console.log("Stuff in localStorage: " + window.localStorage.getItem(this.state.problem.title));
    console.log("User's last solution: " + this.state.lastSolution);

    console.log("User's most recent solution: " + this.state.userSolution);
    let trials = this.state.problem.trials;

    for(let i = 0; i < trials.length; i++) {
      console.log("Trial " + (i + 1) + ":");
      console.log("Parameter: " + trials[i][0]);
      let factorial = function() {};
      let solutionFactorial = function() {};
      let userError;
      let solutionError;
      let userResult;
      let solutionResult;
        
      try {
        if(this.state.lastSolution) {
          // eslint-disable-next-line
          eval("factorial = " + this.state.lastSolution);
        } else {
          // eslint-disable-next-line
          eval("factorial = " + this.state.userSolution);
        }
      } catch(err) {
        userError = err;
        console.log(userError);
      } finally {
        // eslint-disable-next-line
        eval(this.state.problem.solution);
        
        if(userError === undefined) {
          try {
            userResult = factorial(trials[i][0]);
            console.log(userResult);
          } catch(err) {
            userError = err;
            console.log(userError);
          }
        }
        if(userError === undefined) {
          this.state.userTrials.push(userResult);
        } else {
          this.state.userTrials.push(userError);
        }

        try {
          solutionResult = solutionFactorial(trials[i][0]);
          console.log(solutionResult);
        } catch(err) {
          solutionError = err;
          console.log(solutionError);
        } finally {
          if(solutionError === undefined) {
            this.state.solutionTrials.push(solutionResult);
          } else {
            this.state.solutionTrials.push(solutionError);
          }
        }
      }   
    }
    console.log(this.state.userTrials);
    console.log(this.state.solutionTrials);
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.problem.title}, Category: {this.state.problem.category}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Description</h1>
              <p>
                {this.state.problem.question}
              </p>
            </article>
            <h3>Input your solution:</h3>
            <TextArea onChange = {this.handleChange} id="response" name="userSolution" placeholder="Your Solution Here" value={this.state.lastSolution || this.state.userSolution}></TextArea>
            <FormBtn
                disabled={!(this.state.userSolution || this.state.lastSolution)}
                onClick={this.handleSubmit}
              >
                Submit Solution
            </FormBtn>
            
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Problems</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Problem;
