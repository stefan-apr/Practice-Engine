import React from "react";
import Login from "../Login";
import { Row, Col } from "../Grid";
import "./style.css";

function Nav() {
  return (
    
    <Row>
      <Col size="md-12">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand logo" href="/">
            Practice Engine
          </a>
          <Login />
        </nav>
      </Col>
     
    </Row>
  );
}

export default Nav;
