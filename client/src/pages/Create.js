import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

class Problems extends Component {

  state = {
    problems: [],
    title: "",
    question: "",
    solution: "",
    trials: [],
    difficulty: 0,
    category: "",
    chosenProblem: null,
  };

  componentDidMount() {
    this.loadProblems();
  }

  loadProblems = () => {
    API.getProblems()
      .then(res =>
        this.setState({ problems: res.data, title: "", category: "" })
      )
      .catch(err => console.log(err));

    var testMap = new HashMap();

    for(let i = 0; i < 100; i++) {
      testMap.put(i, 100 - i);
    }

    testMap.each(function(pair) {
      console.log(pair);
    });
  };

  deleteProblem = id => {
    API.deleteProblem(id)
      .then(res => this.loadProblems())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      chosenProblem: null
    });
  };

  handleSave = event => {
    event.preventDefault();

    // Change this.state with the user input fields

    if (this.state.title && this.state.category && this.state.question && this.state.solution && this.state.trials) {
      API.saveProblem({
        title: this.state.title,
        question: this.state.question,
        solution: this.state.solution,
        trials: this.state.trials,
        category: this.state.category,
      })
        .then(res => this.loadProblems())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create a new Practice Problem</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                onKeyUp={this.handleKeyUp}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.category}
                onChange={this.handleInputChange}
                name="category"
                placeholder="Category (required)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.category && this.state.difficulty && this.state.question && this.state.solution)}
                onClick={this.handleChoose}
              >
                Create Problem
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>List of Problems</h1>
            </Jumbotron>
            {this.state.problems.length ? (
              <List>
                {this.state.problems.map(problem => (
                  <ListItem key={problem._id}>
                    <Link to={"/problems/" + problem._id}>
                      <strong>
                        {problem.title}, Category: {problem.category}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteProblem(problem._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Problems;
