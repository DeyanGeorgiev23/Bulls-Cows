import React from "react";

import "../App.css";

interface Props {
  hide: () => void;
}

const information = (props: Props) => {
  return (
    <div className="wrapper-info">
      <h1>Information</h1>
      <p>
        There are 4 secret digits all different from each other, You have to
        enter a different combination to find the correct digits! You can't
        repeat the same digit, all must be different! Check the example below
        for more information!
      </p>
      <div className="wrapper-example">
        <h2>Example</h2>
        <h3>The right digits are [ 4 7 0 1 ]</h3>
        <table>
          <tbody>
            <td>6</td>
            <td style={{ color: "red" }}>( 4 )( 7 )( 0) ( 1 )</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 4
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 0
            </td>
          </tbody>
          <tbody>
            <td>5</td>
            <td style={{ color: "red" }}>( 4 )( 7 )( 1 ) ( 0 )</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 2
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 2
            </td>
          </tbody>
          <tbody>
            <td>4</td>
            <td style={{ color: "red" }}>( 4 )( 7 )( 1 ) 2</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 2
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 1
            </td>
          </tbody>
          <tbody>
            <td>3</td>
            <td style={{ color: "red" }}>( 4 )( 1 )9 2</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 1
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 1
            </td>
          </tbody>
          <tbody>
            <td>2</td>
            <td style={{ color: "red" }}>( 4 )9 3 2</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 1
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 0
            </td>
          </tbody>
          <tbody>
            <td>1</td>
            <td style={{ color: "red" }}>( 7 )9 3 2</td>
            <td>
              <img className="pictures" src="./bull.png" alt="Bull" /> 0
            </td>
            <td>
              <img className="pictures" src="./cow.png" alt="Cow" /> 1
            </td>
          </tbody>
        </table>
      </div>
      <button onClick={props.hide}>Back</button>
    </div>
  );
};

export default information;
