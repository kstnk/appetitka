import {
  CLEAR_CART,
  DEL_FROM_CART,
  ADD_GOODS_TO_CART,
  INIT_AGENTS,
  INIT_GOODS,
  REQUEST_GOODS,
  ADJUST_CART,
  INIT_APPLICATIONS,
  GET_CURRENT_USER,
  EDIT_GOODS,
  DELETE_GOODS,
  INIT_AGENT_APPLICATIONS,
  DELETE_FROM_APPLICATION,
  CHANGE_QUANTITY_GOOD,
  ADDITINAL_GOODS_TO_APP,
  INIT_CART_FROM_STORAGE,

} from "./actionTypes";

export function initAgentsAC(payload) {
  return { type: INIT_AGENTS, payload };
}
export function getCurrentUserAC(payload) {
  return { type: GET_CURRENT_USER, payload };
}
export function requestGoodsAC(payload) {
  return { type: REQUEST_GOODS, payload };
}
export function initGoodsAC(payload) {
  return { type: INIT_GOODS, payload };
}
export function editGoodsListAC(payload) {
  return { type: EDIT_GOODS, payload };
}
export function deleteGoodsAC(payload) {
  return { type: DELETE_GOODS, payload };
}


export function addGoodsToCartAC(payload) {
  return { type: ADD_GOODS_TO_CART, payload };
}
export function delGoodsFromCartAC(payload) {
  return { type: DEL_FROM_CART, payload };
}
export function clearCartAC(payload) {
  return { type: CLEAR_CART, payload };
}
export function adjustCartAC(payload) {
  return { type: ADJUST_CART, payload };
}
export function initApplicationsAC(payload){
  return {type: INIT_APPLICATIONS, payload}
}
export function initAgentApplicationsAC(payload){
  return {type: INIT_AGENT_APPLICATIONS, payload}
}
export function deleteFromApplicationAC(payload){
  return {type: DELETE_FROM_APPLICATION, payload}
}
export function changeQuantityGoodAC(payload){
  return {type: CHANGE_QUANTITY_GOOD, payload}
}
export function additionalGoodsToAppAC(payload){
  return {type: ADDITINAL_GOODS_TO_APP, payload}
}
export function initCartFromStorageAC(payload){
  return {type: INIT_CART_FROM_STORAGE, payload}
}