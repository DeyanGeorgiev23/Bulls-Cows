import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actionTypes from "../store/actions";
import Aux from "../Aux";

interface KeyboardEvent {
  key: string;
}

type mapState = ReturnType<typeof mapStateToProps>;
type mapDispatch = ReturnType<typeof mapDispatchToProps>;

type Props = mapState & mapDispatch;

class Header extends React.PureComponent<Props> {
  getUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (name.length < 4) {
      this.props.getShowBtn(false);
      return false;
    }

    if (name.length > 3) {
      this.props.getUsername(name);
      this.props.getShowBtn(true);
    }
  };

  addUsername = (event: KeyboardEvent) => {
    if (this.props.username) {
      if (event.key === "Enter") {
        this.props.getShow(true);
        this.props.getShowBtn(false);
        if (!localStorage.getItem("username")) {
          localStorage.setItem("username", JSON.stringify(this.props.username));
        }
      }
    }
  };

  newGame = () => {
    window.location.href = "/";
  };

  render() {
    return (
      <Aux>
        {this.props.show && (
          <button onClick={this.newGame} className="start-btn">
            START NEW GAME
          </button>
        )}
        {!this.props.show && (
          <div>
            <h2>Enter your name to start the game!</h2>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={this.getUsername}
              onKeyPress={this.addUsername}
              className="input-username"
            />
            {this.props.showBtn && (
              <img className="enter" src="./enter.png" alt="ENTER" />
            )}
          </div>
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: state.username,
  show: state.show,
  showBtn: state.showBtn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUsername: (name: string) =>
    dispatch({ type: actionTypes.GET_USERNAME, payload: name }),
  getShow: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW, payload: condition }),
  getShowBtn: (condition: boolean) =>
    dispatch({ type: actionTypes.SHOW_BTN, payload: condition })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
