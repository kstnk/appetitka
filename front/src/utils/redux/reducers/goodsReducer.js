import { INIT_GOODS } from "../actionTypes";

function goodsReducer(state = { goods: [] }, action) {
  switch (action.type) {
    case INIT_GOODS:
      return { ...state, goods: action.payload };

    default:
      return state;
  }
}

export default goodsReducer;
