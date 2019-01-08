import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actionTypes from "../store/actions";
import NumbersChecker from "./NumbersChecker";

interface KeyboardEvent {
  key: string;
}

interface Statistic {
  userNumbers: Array<number>;
  cows: number;
  bulls: number;
}

interface State {
  validate: boolean;
  value?: string;
}

type mapState = ReturnType<typeof mapStateToProps>;
type mapDispatch = ReturnType<typeof mapDispatchToProps>;

type Props = mapState & mapDispatch;

class Inputs extends React.PureComponent<Props> {
  state: State = {
    validate: false,
    value: ""
  };

  validation = () => {
    this.setState({
      validate: false
    });
    this.props.getShowBtn(false);
    this.props.getErrorMessages("This digit is already used!");
  };

  getUserNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arrNumbers = Array.from(event.target.value).map(Number);
    arrNumbers.length > 3 ? this.props.getShowBtn(true) : null;
    if (arrNumbers.length > 4) {
      this.props.getErrorMessages("Only 4 digit are allowed!");
      return false;
    }
    for (let i = 0; i < arrNumbers.length; i++) {
      if (arrNumbers.length > 1) {
        if (arrNumbers[0] === arrNumbers[2]) {
          this.validation();
          return false;
        } else if (arrNumbers[1] === arrNumbers[3]) {
          this.validation();
          return false;
        } else if (arrNumbers[0] === arrNumbers[3]) {
          this.validation();
          return false;
        }
        if (arrNumbers[i] === arrNumbers[i + 1]) {
          this.validation();
          return false;
        }
      }
    }
    for (let arr of this.props.statistic) {
      if (arr.userNumbers.toString() === arrNumbers.toString()) {
        this.props.getErrorMessages("You already used this combination!");
        this.props.getShowBtn(false);
        this.setState({ validate: false });
        return;
      }
    }
    this.props.getUserNumbers(arrNumbers);
    this.props.getShowBtn(false);
    if (arrNumbers.length < 4) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
    this.setState({
      value: event.target.value
    });
  };

  checkMethod = (event: KeyboardEvent) => {
    if (event.key === "Enter" && this.state.validate) {
      let data = [...this.props.statistic];
      const numbers = this.props.numbers;
      const userNumbers = this.props.userNumbers;
      const username = this.props.username;

      let { newData, newSuccessMessage, newShowInput } = NumbersChecker(
        numbers,
        userNumbers,
        username,
        data
      );

      this.props.getStatistic(newData);
      this.props.getSuccessMessages(newSuccessMessage);
      this.props.getErrorMessages("");
      this.props.getShowBtn(false);
      this.props.getShowInput(newShowInput);

      this.setState({
        value: "",
        validate: false
      });
    }
  };

  render() {
    return (
      <div className="wrapper-input">
        {this.props.showInput ? (
          <input
            className="custom-input"
            id="numbers"
            type="number"
            placeholder="* * * *"
            onChange={this.getUserNumbers}
            onKeyPress={this.checkMethod}
            value={this.state.value}
          />
        ) : (
          <p className="success-msg">{this.props.successMessage}</p>
        )}
        {this.props.show && this.state.validate && (
          <img className="enter" src="./enter.png" alt="ENTER" />
        )}
        <p className="error-msg">{this.props.errorMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  successMessage: state.successMessage,
  errorMessage: state.errorMessage,
  showInput: state.showInput,
  show: state.show,
  statistic: state.statistic,
  numbers: state.numbers,
  userNumbers: state.userNumbers,
  username: state.username,
  showBtn: state.showBtn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getStatistic: (data: Array<Statistic>) =>
    dispatch({ type: actionTypes.GET_STATISTIC, payload: data }),
  getErrorMessages: (msg: string) =>
    dispatch({ type: actionTypes.ERR_MESSAGE, payload: msg }),
  getSuccessMessages: (msg: string) =>
    dispatch({ type: actionTypes.SUCCESS_MESSAGE, payload: msg }),
  getShowBtn: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_BTN, payload: condition }),
  getUserNumbers: (numbers: Array<number>) =>
    dispatch({ type: actionTypes.GET_USER_NUMBERS, payload: numbers }),
  getShowInput: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_INPUT, payload: condition })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputs);
