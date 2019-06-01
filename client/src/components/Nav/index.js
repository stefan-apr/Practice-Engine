import React from "react";
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
        </nav>
      </Col>
     
    </Row>
  );
}

export default Nav;
