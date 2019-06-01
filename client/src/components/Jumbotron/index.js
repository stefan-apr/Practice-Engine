import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: "auto", clear: "both", paddingTop: 20, textAlign: "center", overflow: "auto" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
