import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { FormBtn } from "../components/Form";
import CodeMirrorEditor from '../components/CodeMirrorEditor';
require('codemirror/mode/javascript/javascript');
import ('codemirror/lib/codemirror.css');
import ('codemirror/theme/material.css');


class Problem extends Component {
  
  state = {
    problem: {},
    userSolution: "",
    lastSolution: "",
    trialData: {trials: [], userTrials: [], solutionTrials: []}
  };

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
    var editor = document.querySelector('.CodeMirror').CodeMirror;
    const value = editor.getValue();
    this.setState({
      userSolution: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

      window.localStorage.setItem(this.state.problem.title, this.state.userSolution);
      let trials = this.state.problem.trials;
      let userTrials = [];
      let solutionTrials = [];
      let indiv = [];

      for(let i = 0; i < trials.length; i++) {
        let factorial = function() {};
        let solutionFactorial = function() {};
        let userError;
        let solutionError;
        let userResult;
        let solutionResult;

        indiv.push(trials[i][0]);
          
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
        } finally {
          // eslint-disable-next-line
          eval(this.state.problem.solution);
          
          if(userError === undefined) {
            try {
              userResult = factorial(trials[i][0]);
            } catch(err) {
              userError = err;
            }
          }
          if(userError === undefined) {
            userTrials.push(userResult);
          } else {
            userTrials.push(userError);
          }

          try {
            solutionResult = solutionFactorial(trials[i][0]);
          } catch(err) {
            solutionError = err;
          } finally {
            if(solutionError === undefined) {
              solutionTrials.push(solutionResult);
            } else {
              solutionTrials.push(solutionError);
            }
          }
        }   
      }
      this.setState({trialData: {trials: indiv, userTrials: userTrials, solutionTrials: solutionTrials}});
      document.getElementById("result-table").removeAttribute("hidden");
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
            <CodeMirrorEditor onChange={this.handleChange} id="response" name="userSolution" value={this.state.lastSolution || this.state.userSolution} />
            <FormBtn
                disabled={!(this.state.userSolution || this.state.lastSolution)}
                onClick={this.handleSubmit}
              >
                Submit Solution
            </FormBtn>
            <table hidden = {"hidden"} id="result-table">
              <tbody>
              <tr>
                <th>Trial:</th>
                <th>Parameters:</th>
                <th>Expected:</th>
                <th>Actual:</th>
              </tr>
            {this.state.trialData.trials.map((trial, index) => (
              <tr>
                <td>{index}</td>
                <td>{trial}</td>
                <td>{this.state.trialData.solutionTrials[index]}</td>
                <td>{this.state.trialData.userTrials[index]}</td>
              </tr>
            ))}</tbody></table>
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
