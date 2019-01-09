import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import "../../App.css";

import * as actionTypes from "../../store/actions";
import Inputs from "./Inputs";
import Output from "./Outputs";
import Header from "./Header";
import Helper from "./Helpers";
import CashedData from "./CashedData";
import Information from "../Static/Information";

import * as StaticHTML from "../Static/StaticHtml";

interface CashedData {
  userNumbers: Array<number>;
  tries: number;
}

interface Statistic {
  userNumbers: Array<number>;
  cows: number;
  bulls: number;
}

interface State {
  showCashed: boolean;
  timer: any;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

class BullsAndCows extends React.PureComponent<Props> {
  state: State = {
    showCashed: false,
    timer: null
  };

  componentDidMount = () => {
    this.props.generateNumbers();
    if (localStorage.getItem("username")) {
      const data = localStorage.getItem("username");
      const username = data ? JSON.parse(data) : "";
      this.props.getUsername(username);
      this.props.getShow(true);
      this.props.getShowBtn(false);
    }

    let seconds = 0;
    this.state.timer = setInterval(() => {
      seconds++;
      this.props.getSeconds(seconds);
    }, 1000);
  };

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.gameFinished !== this.props.gameFinished) {
      clearInterval(this.state.timer);
    }
  }

  showCashedData = () => {
    const data = localStorage.getItem("userData");
    const cashedData = JSON.parse(data as string);
    this.props.getCashedData(cashedData);
    this.setState({ showCashed: true });
  };

  hideCashedData = () => {
    this.setState({ showCashed: false });
  };

  hideInformation = () => {
    this.props.getShowInfo(false);
  };

  render() {
    return (
      <div className="container">
        {StaticHTML.HEADER_INFO}
        <Header />
        <Helper />
        {this.props.showInfo && <Information hide={this.hideInformation} />}
        <CashedData
          showCashed={this.state.showCashed}
          username={this.props.username}
          hideCashedData={this.hideCashedData}
          cashedData={this.props.cashedData}
        />
        {this.props.show && (
          <div>
            <Inputs />
            {StaticHTML.BODY}
            <div className="wrapper-results">
              {this.props.statistic.map((d: Statistic, i: number) => {
                return (
                  <Output
                    key={i}
                    cows={d.cows}
                    bulls={d.bulls}
                    numbers={d.userNumbers}
                    counter={this.props.statistic.length - i}
                  />
                );
              })}
            </div>
          </div>
        )}
        {this.props.show && (
          <button className="stats" onClick={this.showCashedData}>
            Check your stats!
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: state.username,
  statistic: state.statistic,
  cashedData: state.cashedData,
  show: state.show,
  showInfo: state.showInfo,
  gameFinished: state.gameFinished,
  seconds: state.seconds
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  generateNumbers: () => dispatch({ type: actionTypes.GET_SECRET_NUMBER }),
  getUsername: (name: string) =>
    dispatch({ type: actionTypes.GET_USERNAME, payload: name }),
  getCashedData: (data: Array<CashedData>) =>
    dispatch({ type: actionTypes.CASHED_DATA, payload: data }),
  getShow: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW, payload: condition }),
  getShowBtn: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_BTN, payload: condition }),
  getShowInfo: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_INFO, payload: condition }),
  getSeconds: (sec: number) =>
    dispatch({ type: actionTypes.SECONDS, payload: sec })
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BullsAndCows);
