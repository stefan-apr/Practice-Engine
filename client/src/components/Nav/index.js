import React from "react";
import { Row, Col } from "../Grid";
import "./style.css";
import {Link} from "react-router-dom";

function Nav() {
  
  return (
    <Row>
      <Col size="md-12">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to = "/"><a className="navbar-brand logo" href="/">
            Practice Engine
          </a>
          </Link>
        </nav>
      </Col>
    </Row>
  );
}

export default Nav;
