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
var babel = require("babel-core");
var loopcontrol = require("../components/BabelControl/loopcontrol");

class Problem extends Component {
  
  state = {
    problem: {},
    userSolution: "",
    lastSolution: "",
    trialData: {trials: [], userTrials: [], solutionTrials: [], comparison: [], numCorrect: 0}
  };
 
  // When this component mounts, grab the problem with the _id of this.props.match.params.id
  // e.g. localhost:3000/problems/599dcb67f0f16317844583fc
  componentDidMount() { 
    API.getProblem(this.props.match.params.id)
      .then(res => this.setState({ problem: res.data }))
      .then(() => this.setState({lastSolution: window.localStorage.getItem(this.state.problem.title)}))
      .then(/* () => console.log(this.state.problem) */)
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

  modifySrc = function(src) {
    var out = babel.transform(src, {
      plugins: [loopcontrol]
    });
    // print the generated code to screen
    // console.log(out.code);
    return out.code;
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    window.localStorage.setItem(this.state.problem.title, this.state.userSolution);
    let trials = JSON.parse(JSON.stringify(this.state.problem.trials));
    let userTrials = [];
    let solutionTrials = [];
    let indiv = JSON.parse(JSON.stringify(trials));
    let paramCopy = JSON.parse(JSON.stringify(trials));
    let comparison = [];
    let numCorrect = 0;

    for(let i = 0; i < trials.length; i++) {
      let user = function() {};
      let solution = function() {};
      let userError;
      let solutionError;
      let userResult;
      let solutionResult;
      let param1; let param2; let param3; let param4; let param5;
      let solParam1; let solParam2; let solParam3; let solParam4; let solParam5;

      try {
        if(this.state.lastSolution) {
          // eslint-disable-next-line
          eval(this.modifySrc("user = " + this.state.lastSolution));
        } else {
          // eslint-disable-next-line
          eval(this.modifySrc("user = " + this.state.userSolution));
        }
      } catch(err) {
        userError = "Syntax Error: " + err.message;
      } finally {
        // eslint-disable-next-line
        eval(this.state.problem.solution);
        if(userError === undefined) {
          try {
            // This is kind of an awful way to set up the parameters, but I could not think of a way to do it with loops.
            // It works b/c you can pass in any number of parameters into a JS function and the extras will go unused.
            // All the extra parameters, (in most cases param2 - param5), will be left undefined which is fine.
            param1 = JSON.parse(JSON.stringify(paramCopy[i][0]));
            solParam1 = JSON.parse(JSON.stringify(paramCopy[i][0]));
            if(paramCopy[i][1] !== undefined) {
              param2 = JSON.parse(JSON.stringify(paramCopy[i][1]));
              solParam2 = JSON.parse(JSON.stringify(paramCopy[i][1]));
              if(paramCopy[i][2] !== undefined) {
                param3 = JSON.parse(JSON.stringify(paramCopy[i][2]));
                solParam3 = JSON.parse(JSON.stringify(paramCopy[i][2]));
                if(paramCopy[i][3] !== undefined) {
                  param4 = JSON.parse(JSON.stringify(paramCopy[i][3]));
                  solParam4 = JSON.parse(JSON.stringify(paramCopy[i][3]));
                  if(paramCopy[i][4] !== undefined) {
                    param5 = JSON.parse(JSON.stringify(paramCopy[i][4]));
                    solParam5 = JSON.parse(JSON.stringify(paramCopy[i][4]));
                  }
                }
              }
            }
            userResult = user(param1, param2, param3, param4, param5);
          } catch(err) {
            userError = err;
          }
        }

        if(this.state.problem.examineType === "return") {
          if(userError === undefined) {
            userTrials.push(userResult);
          } else {
            userTrials.push(userError);
          }

          try {
            solutionResult = solution(solParam1, solParam2, solParam3, solParam4, solParam5);
          } catch(err) {
            solutionError = err;
          } finally {
            if(solutionError === undefined) {
              solutionTrials.push(solutionResult);
              if(!Array.isArray(solutionResult) && typeof(solutionResult) !== 'object') {
                if(solutionResult === userResult) {
                  comparison.push(true);
                  numCorrect++;
                } else {
                  comparison.push(false);
                }
              } else {
                if(JSON.stringify(solutionResult) === JSON.stringify(userResult)) {
                  comparison.push(true);
                  numCorrect++;
                } else {
                  comparison.push(false);
                }
              }
            } else {
              solutionTrials.push(solutionError);
              if(userError !== undefined && !userError.toString().match(/^Syntax Error/)) {
                comparison.push(true);
                numCorrect++;
              } else {
                comparison.push(false);
              }
            }
          }
        } else if(this.state.problem.examineType === "paramArray") {
          if(userError === undefined) {
            userTrials.push(param1);
          } else {
            userTrials.push(userError);
          }

          try {
            solutionResult = solution(solParam1, solParam2, solParam3, solParam4, solParam5);
          } catch(err) {
            solutionError = err;
          } finally {
            if(solutionError === undefined) {
              solutionTrials.push(solParam1);
              if(JSON.stringify(solParam1) === JSON.stringify(param1)) {
                comparison.push(true);
                numCorrect++;
              } else {
                comparison.push(false);
              }
            } else {
              solutionTrials.push(solutionError);
              if(userError !== undefined && !userError.toString().match(/^Syntax Error/)) {
                comparison.push(true);
                numCorrect++;
              } else {
                comparison.push(false);
              }
            }
          }
        } else if(this.state.problem.examineType === "paramLinkedList") {

        } else if(this.state.problem.examineType === "paramStack") {

        } else if(this.state.problem.examineType === "paramQueue") {

        } 
      }   
    }
    this.setState({trialData: {trials: indiv, userTrials: userTrials, solutionTrials: solutionTrials, comparison: comparison, numCorrect: numCorrect}});
    document.getElementById("result-table").removeAttribute("hidden");
    document.getElementById("trials-passed-banner").removeAttribute("hidden");
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
            <span hidden = {"hidden"} id="trials-passed-banner">
            {this.state.trialData.numCorrect === this.state.trialData.comparison.length ? <img src = "/images/pass.png" alt = "success/fail icon" className="pass-fail" style = {{filter: "brightness(50%)"}}></img> : <img src = "/images/fail.png" alt = "success/fail icon" className="pass-fail" style = {{filter: "brightness(70%)"}}></img>}
            <h2 style = {{display: 'inline'}}>You passed {this.state.trialData.numCorrect} out of {this.state.trialData.comparison.length} trials.</h2>
            </span>
            <table hidden = {"hidden"} id="result-table" className="table table-bordered">
              <tbody>
              <tr>
                <th>Trial:</th>
                <th>Parameters:</th>
                <th>Expected:</th>
                <th>Actual:</th>
                <th>Result:</th>
              </tr>
            {this.state.trialData.trials.map((trial, index) => (
              <tr key={"trial-" + index} className={(this.state.trialData.comparison[index] ? "table-success" : "table-danger")}>

                {/* Console logs for each table row entry */}
                {/* console.log(index)}{console.log(trial)}{console.log(this.state.trialData.solutionTrials[index])}{console.log(this.state.trialData.userTrials[index]) */}

                <td>{index}</td>
                <td>{trial.length === 1 ? Array.isArray(trial[0]) ? trial[0].length === 0 ? "Empty Array" : "[" + trial[0].join(", ") + "]" : JSON.stringify(trial[0]) : "{" + trial.join(", ") + "}"}</td>
                <td>{Array.isArray(this.state.trialData.solutionTrials[index]) ? this.state.trialData.solutionTrials[index].length === 0 ? "Empty Array" : "[" + this.state.trialData.solutionTrials[index].join(", ") + "]" : JSON.stringify(this.state.trialData.solutionTrials[index])}</td>
                <td>{typeof(this.state.trialData.userTrials[index]) === "undefined" ? "Return Undefined" : Array.isArray(this.state.trialData.userTrials[index]) ? this.state.trialData.userTrials[index].length === 0 ? "Empty Array" : "[" + this.state.trialData.userTrials[index].join(", ") + "]" : JSON.stringify(this.state.trialData.userTrials[index])}</td>
                <td>{this.state.trialData.comparison[index] ? <img src="/images/pass.png" alt="Passed" className="pass-fail" style = {{filter: "brightness(50%)"}}></img> : <img src="/images/fail.png" alt="Failed" className="pass-fail" style = {{filter: "brightness(70%)"}}></img>} {this.state.trialData.comparison[index] ? "Pass" : "Fail"} </td>
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