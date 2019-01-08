import React from "react";

interface Props {
  bulls: number;
  cows: number;
  numbers: Array<number>;
  counter: number;
  key: number;
}

const Outputs = (props: Props) => {
  return (
    <table>
      <tbody key={props.key}>
        <td>{props.counter}</td>
        <td style={{ color: "red" }}>{props.numbers}</td>
        <td>
          <img className="pictures" src="./bull.png" alt="Bull" /> {props.bulls}
        </td>
        <td>
          <img className="pictures" src="./cow.png" alt="Cow" /> {props.cows}
        </td>
      </tbody>
    </table>
  );
};

export default Outputs;
