import React from "react";
import Aux from "../Aux";

export const HEADER_INFO = (
  <div className="header">
    <h1 className="header-child">BULLS</h1>
    <img className="header-child" src="./cow-header.png" alt="Cow" />
    <img className="header-child" src="./bull-header.png" alt="Bull" />
    <h1 className="header-child">COWS</h1>
  </div>
);

export const BODY = (
  <Aux>
    <div className="results-header">
      <cite>Try</cite>
      <cite>Guess</cite>
      <cite>Results</cite>
    </div>
    <div className="wrapper-pictures">
      <img src="angry-cow.png" alt="Cow" />
      <img src="angry-bull.png" alt="Bull" />
    </div>
  </Aux>
);
