
import { CHANGE_QUANTITY_GOOD, DELETE_FROM_APPLICATION, INIT_AGENTS, REQUEST_GOODS, EDIT_GOODS, DELETE_GOODS, INIT_APPLICATIONS, ADDITINAL_GOODS_TO_APP } from "../actionTypes"

function adminReducer(state = { agents: [], applications: [], goodsList: [] }, action) {
  switch (action.type) {
    case REQUEST_GOODS:
      return { ...state, goodsList: action.payload };
    case INIT_AGENTS:
      return { ...state, agents: action.payload };
    case INIT_APPLICATIONS:
      return { ...state, applications: action.payload }
    case EDIT_GOODS:
      const editedGoodIndex = state.goodsList.findIndex(good => good._id === action.payload._id)
      return {
        ...state, goodsList: [
          ...state.goodsList.slice(0, editedGoodIndex),
          action.payload,
          ...state.goodsList.slice(editedGoodIndex + 1)
        ]
      };
    case DELETE_GOODS:
      return { ...state, goodsList: state.goodsList.filter(good => good._id !== action.payload._id) };
    case ADDITINAL_GOODS_TO_APP:
      let needApplicationToEdit = state.applications.find(el => el.regnumber == action.payload.regnumber);
      const indexApplication = state.applications.findIndex(el => el.regnumber == action.payload.regnumber)
      needApplicationToEdit = {...needApplicationToEdit, goods:needApplicationToEdit.goods.concat(action.payload.goods)}
      return { ...state, applications: [...state.applications.slice(0, indexApplication), needApplicationToEdit, ...state.applications.slice(indexApplication + 1)] };
    case DELETE_FROM_APPLICATION:
      const application = state.applications.find(el => el.regnumber == action.payload.regnumber);
      const newgoods = application.goods.filter(el => el.title !== action.payload.goodTitle)
      application["goods"] = newgoods;
      return { ...state, applications: [...state.applications.filter(app => app.regnumber !== action.payload.regnumber), application] }
    case CHANGE_QUANTITY_GOOD:
      const needApplication = state.applications.find(el => el.regnumber == action.payload.regnumber);
      const index = state.applications.findIndex(el => el.regnumber == action.payload.regnumber)
      const needgood = needApplication.goods.find(el => el.title === action.payload.goodTitle)
      needgood.value = action.payload.value
      return { ...state, applications: [...state.applications.slice(0, index), needApplication, ...state.applications.slice(index + 1)] }
    default:
      return state;
  }
}

export default adminReducer;
