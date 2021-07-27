import {
  CLEAR_CART,
  ADD_GOODS_TO_CART,
  DEL_FROM_CART,
  ADJUST_CART,
  GET_CURRENT_USER,
  INIT_AGENT_APPLICATIONS,
  INIT_CART_FROM_STORAGE,
} from "../actionTypes";

function agentReducer(state = { cart: [], currentUser: "", applications: [] }, action) {
  switch (action.type) {
    case ADD_GOODS_TO_CART:
      const index = state.cart.findIndex(
        (el) => el.title === action.payload.title
      );
      if (index !== -1 && state.cart[index].value === action.payload.value) {
        return state;
      }
      if (index !== -1) {
        return {
          ...state,
          cart: state.cart.map((el) => {
            if (el.title === action.payload.title) {
              return {
                title: action.payload.title,
                value: action.payload.value,
              };
            } else return el;
          }),
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case DEL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((el) => {
          if (el.title !== action.payload) {
            return true;
          } else return false;
        }),
      };
    case ADJUST_CART:
      const adjIndex = state.cart.findIndex(
        (el) => el.title === action.payload.title
      );
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, adjIndex),
          { ...state.cart[adjIndex], value: action.payload.value },
          ...state.cart.slice(adjIndex + 1),
        ],
      };
    case INIT_CART_FROM_STORAGE:
      return { ...state, cart: action.payload };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
      case INIT_AGENT_APPLICATIONS:
        return {...state, applications: action.payload}
    default:
      return state;
  }
}

export default agentReducer;
