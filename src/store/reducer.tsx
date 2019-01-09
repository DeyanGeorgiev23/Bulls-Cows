import * as actionTypes from "./actions";

import { AnyAction } from "redux";

import NumberGenerator from "../funcs/NumbersGenerator";

interface Statistic {
  userNumbers: Array<number>;
  cows: number;
  bulls: number;
}

interface CashedData {
  userNumbers: Array<number>;
  tries: number;
}

export interface StateReducer {
  numbers: Array<number>;
  username: string;
  userNumbers: Array<number>;
  statistic: Array<Statistic>;
  errorMessage: string;
  successMessage: string;
  cashedData: Array<CashedData>;
  helperNumbers: Array<number>;
  show: boolean;
  showInput: boolean;
  showBtn: boolean;
  showInfo: boolean;
  seconds: number;
  gameFinished: boolean;
}

const INITIAL_STATE: StateReducer = {
  numbers: [],
  username: "",
  userNumbers: [],
  statistic: [],
  errorMessage: "",
  successMessage: "",
  cashedData: [],
  helperNumbers: [],
  show: false,
  showInput: true,
  showBtn: false,
  showInfo: false,
  gameFinished: false,
  seconds: 0
};

const reducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.GET_SECRET_NUMBER:
      let newNumbers = [...state.numbers];
      newNumbers = NumberGenerator();
      return { ...state, numbers: newNumbers };
    case actionTypes.GET_USERNAME:
      return { ...state, username: action.payload };
    case actionTypes.GET_USER_NUMBERS:
      return { ...state, userNumbers: action.payload };
    case actionTypes.GET_STATISTIC:
      return { ...state, statistic: action.payload };
    case actionTypes.ERR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case actionTypes.SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case actionTypes.CASHED_DATA:
      return { ...state, cashedData: action.payload };
    case actionTypes.HELPER_NUMBERS:
      return { ...state, helperNumbers: action.payload };
    case actionTypes.SHOW:
      return { ...state, show: action.payload };
    case actionTypes.SHOW_BTN:
      return { ...state, showBtn: action.payload };
    case actionTypes.SHOW_INPUT:
      return { ...state, showInput: action.payload };
    case actionTypes.SHOW_INFO:
      return { ...state, showInfo: action.payload };
    case actionTypes.SECONDS:
      return { ...state, seconds: action.payload };
    case actionTypes.GAME_FINISH:
      return { ...state, gameFinished: action.payload };
    default:
      return state;
  }
};

export default reducer;
