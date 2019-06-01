import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { FormBtn } from "../components/Form";
import CodeMirrorEditor from '../components/CodeMirrorEditor';
import ListNode from "../components/LinkedList/ListNode.js";
import Queue from "../components/Queue/Queue.js";
import Stack from "../components/Stack/Stack.js";
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

  typeHandler = function(type, variable) {
    if(type === "Number" || type === "String" || type === "Boolean") {
      return variable;
    } else if(type === "Array") {
      return JSON.parse(JSON.stringify(variable));
    } else if (type === "LinkedList") {
      var list = this.generateLinkedList(variable);
      return list;
    } else if (type === "Stack") {
      var stack = this.generateSQ(variable, "Stack");
    } else if(type === "Queue") {
      var queue = this.generateSQ(variable, "Queue");
    }
  }

  generateSQ = function(obj, type) {
    let SQ = null;
    if(type === "Queue") {

    } else {

    }
    return SQ;
  }

  generateLinkedList = function(obj) {
    if(obj === null) {
      return null;
    }
    if(obj.next === null) {
      return new ListNode(obj.data);
    }
    let listArr = [];
    do {
      listArr.push(new ListNode(obj.data));
      if(obj.next !== null) { 
        obj = obj.next;
      }
    } while(obj.next !== null)
    listArr.push(new ListNode(obj.data));

    for(let i = 0; i < listArr.length - 1; i++) {
      listArr[i].next = listArr[i + 1];
    }
    return listArr[0];
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    window.localStorage.setItem(this.state.problem.title, this.state.userSolution);
    let userTrials = [];
    let solutionTrials = [];
    let trialCopy = Array.from(this.state.problem.trials);
    let comparison = [];
    let numCorrect = 0;

    for(let i = 0; i < this.state.problem.trials.length; i++) {
      let user = function() {};
      let solution = function() {};
      let userError;
      let solutionError;
      let userResult;
      let solutionResult;
      let param0; let param1; let param2; let param3; let param4;
      let solParam0; let solParam1; let solParam2; let solParam3; let solParam4;

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
            param0 = this.typeHandler(this.state.problem.paramTypes[0], this.state.problem.trials[i][0]);
            solParam0 = this.typeHandler(this.state.problem.paramTypes[0], this.state.problem.trials[i][0]);
            trialCopy[i][0] = (this.typeHandler(this.state.problem.paramTypes[0], this.state.problem.trials[i][0]));
            if(this.state.problem.trials[i][1] !== undefined) {
              param1 = this.typeHandler(this.state.problem.paramTypes[1], this.state.problem.trials[i][1]);
              solParam1 = this.typeHandler(this.state.problem.paramTypes[1], this.state.problem.trials[i][1]);
              trialCopy[i][1] = (this.typeHandler(this.state.problem.paramTypes[1], this.state.problem.trials[i][1]));
              if(this.state.problem.trials[i][2] !== undefined) {
                param2 = this.typeHandler(this.state.problem.paramTypes[2], this.state.problem.trials[i][2]);
                solParam2 = this.typeHandler(this.state.problem.paramTypes[2], this.state.problem.trials[i][2]);
                trialCopy[i][2] = (this.typeHandler(this.state.problem.paramTypes[2], this.state.problem.trials[i][2]));
                if(this.state.problem.trials[i][3] !== undefined) {
                  param3 = this.typeHandler(this.state.problem.paramTypes[3], this.state.problem.trials[i][3]);
                  solParam3 = this.typeHandler(this.state.problem.paramTypes[3], this.state.problem.trials[i][3]);
                  trialCopy[i][3] = (this.typeHandler(this.state.problem.paramTypes[3], this.state.problem.trials[i][3]));
                  if(this.state.problem.trials[i][4] !== undefined) {
                    param4 = this.typeHandler(this.state.problem.paramTypes[4], this.state.problem.trials[i][4]);
                    solParam4 = this.typeHandler(this.state.problem.paramTypes[4], this.state.problem.trials[i][4]);
                    trialCopy[i][4] = (this.typeHandler(this.state.problem.paramTypes[4], this.state.problem.trials[i][4]));
                  }
                }
              }
            }
            userResult = user(param0, param1, param2, param3, param4);
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
            solutionResult = solution(solParam0, solParam1, solParam2, solParam3, solParam4);
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
            userTrials.push(param0);
          } else {
            userTrials.push(userError);
          }

          try {
            solutionResult = solution(solParam0, solParam1, solParam2, solParam3, solParam4);
          } catch(err) {
            solutionError = err;
          } finally {
            if(solutionError === undefined) {
              solutionTrials.push(solParam0);
              if(JSON.stringify(solParam0) === JSON.stringify(param0)) {
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
        } else if(this.state.problem.examineType === "paramStackQueue" || this.state.problem.examineType === "paramLinkedList") {
          if(userError === undefined) {
            userTrials.push(param0);
          } else {
            userTrials.push(userError);
          }

          try {
            solutionResult = solution(solParam0, solParam1, solParam2, solParam3, solParam4);
          } catch(err) {
            solutionError = err;
          } finally {
            if(solutionError === undefined) {
              solutionTrials.push(solParam0);
              if(solParam0.toString() === param0.toString()) {
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
        }
      }   
    }
    this.setState({trialData: {trials: trialCopy, userTrials: userTrials, solutionTrials: solutionTrials, comparison: comparison, numCorrect: numCorrect}});
    document.getElementById("result-table").removeAttribute("hidden");
    document.getElementById("trials-passed-banner").removeAttribute("hidden");
  }

  renderTrial(element, trial) {
    let result = "";
    if(Array.isArray(element)) {
      if(element.length === 0) {
        result += "Empty Array";
      } else {
        result += "[" + element.join(", ") + "]";
      }
    } else if(typeof(element) === "string" || typeof(element) === "number" || typeof(element) === "boolean") {
      result += JSON.stringify(element);
    } else if(element !== undefined) {
      result += "{ " + element.toString() + " }";
    } else {
      result += "Return Undefined";
    }
    if(trial !== undefined) {
      if(trial[trial.length - 1] !== element) {
        result += ", ";
      }
    }
    return result;
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.problem.title}
                <br />
              </h1>
              <h4>Category: {this.state.problem.category}</h4>
              <br />
              <article style={{textAlign:"left"}}>
              <p>
                {this.state.problem.question}
              </p>
            </article>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            
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

                <td>{index + 1}</td>
                <td>{trial.map((element) => (
                  this.renderTrial(element, trial)
                ))}</td>
                <td>{this.renderTrial(this.state.trialData.solutionTrials[index])}</td>
                <td>{this.renderTrial(this.state.trialData.userTrials[index])}</td>
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