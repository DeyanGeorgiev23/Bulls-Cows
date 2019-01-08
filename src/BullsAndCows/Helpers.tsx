import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actionTypes from "../store/actions";
import Aux from "../Aux";

interface State {
  showHelper: boolean;
  showAnswer: boolean;
  showAnswerInfo: boolean;
}

type mapState = ReturnType<typeof mapStateToProps>;
type mapDispatch = ReturnType<typeof mapDispatchToProps>;

type Props = mapState & mapDispatch;

class Helpers extends React.PureComponent<Props> {
  state: State = {
    showHelper: false,
    showAnswer: true,
    showAnswerInfo: false
  };
  generateHelperNumber = () => {
    const randomNumber = Math.floor(Math.random() * 4 + 0);
    const helperArr = ["*", "*", "*", "*"];
    helperArr[randomNumber] = this.props.numbers[randomNumber];
    return helperArr;
  };
  showAnswerMethod = () => {
    const helperArr = this.generateHelperNumber();
    this.props.getHelperNumbers(helperArr as Array<string>);

    this.setState({ showHelper: true });
    setTimeout(() => {
      this.setState({ showAnswer: false });
    }, 2000);
    if (!this.state.showAnswer) {
      this.setState({ showAnswerInfo: true });
    }
    setTimeout(() => {
      this.setState({ showAnswerInfo: false });
    }, 2500);
  };

  showInformation = () => {
    this.props.getShowInfo(true);
  };

  render() {
    return (
      <Aux>
        {this.props.show && this.props.showInput && (
          <div className="help">
            <img onClick={this.showAnswerMethod} src="./help.png" alt="HELP" />
          </div>
        )}

        {this.state.showHelper && this.state.showAnswer && (
          <div className="helper">
            <p className="helper-msg">{this.props.helperNumbers.join(" ")}</p>
          </div>
        )}

        {this.state.showAnswerInfo && (
          <div className="helper2">
            <p>You have only one hint per game!</p>
          </div>
        )}

        {this.props.show && this.props.showInput && (
          <div className="info">
            <img
              onClick={this.showInformation}
              src="./info.png"
              alt="INFORMATION"
            />
          </div>
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state: any) => ({
  numbers: state.numbers,
  show: state.show,
  showInput: state.showInput,
  helperNumbers: state.helperNumbers
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getHelperNumbers: (data: Array<string>) =>
    dispatch({ type: actionTypes.HELPER_NUMBERS, payload: data }),
  getShowInput: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_INPUT, payload: condition }),
  getShowInfo: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_INFO, payload: condition })
});

export default connect<mapState, mapDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(Helpers);
