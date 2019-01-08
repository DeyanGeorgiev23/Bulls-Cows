import React from "react";

import Aux from "../../hoc/Aux";

interface CashedData {
  userNumbers: Array<number>;
  tries: number;
}

interface Props {
  showCashed: boolean;
  username: string;
  hideCashedData: () => void;
  cashedData: Array<CashedData>;
}

const cashedData = (props: Props) => {
  return (
    <Aux>
      {props.showCashed ? (
        <div className="wrapper-cashedResults">
          <button onClick={props.hideCashedData}>X</button>
          <h1>This are your results {props.username}!</h1>
          {props.cashedData ? (
            props.cashedData.map((data: CashedData, index: number) => {
              return (
                <div>
                  <p>
                    <strong>Game {index + 1}:</strong> The familiar numbers are{" "}
                    <strong style={{ color: "red" }}>
                      ( {data.userNumbers.join(" ")} )
                    </strong>{" "}
                    for {data.tries} attempts!
                  </p>
                </div>
              );
            })
          ) : (
            <p>You don't have data yet!</p>
          )}
          <button onClick={props.hideCashedData}>Close</button>
        </div>
      ) : null}
    </Aux>
  );
};

export default cashedData;
