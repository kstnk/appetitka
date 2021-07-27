import { combineReducers } from "redux";
import agentReducer from "./agentReducer";
import adminReducer from "./adminReducer";
import goodsReducer from "./goodsReducer";

const rootReducer = combineReducers({
  agentReducer,
  adminReducer,
  goodsReducer,
});

export default rootReducer;
