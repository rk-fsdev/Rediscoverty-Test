import { SET_CURR_TOOL, SET_CROPS } from './actions';
// import Immutable from "seamless-immutable";

const initState = {
  currTool: '',
  crops: []
};

export default function companyReducer(state = initState, { type, payload }) {
  switch (type) {
    case SET_CURR_TOOL:
      return {
        ...state,
        currTool: payload
      };
    case SET_CROPS:
      return {
        ...state,
        crops: payload
      };
    default:
      return state;
  }
}
