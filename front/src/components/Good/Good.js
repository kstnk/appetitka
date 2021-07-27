import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  addGoodsToCartAC,
  delGoodsFromCartAC,
  adjustCartAC,
} from "../../utils/redux/actionCreators";

export default function Good({ el }) {
  const{id} = useParams();
  const dispatch = useDispatch();
  const goodsNumberInput = useRef();
  const location = useLocation();
  const cart = useSelector((state) =>state.agentReducer.cart)
  let itemInCart;
  if (cart.length && el) {
    itemInCart = cart.find((good) => good.title === el.title)
  }
  // const itemInCart = useSelector((state) =>
  //   state.agentReducer.cart.find((good) => good.title === el.title)
  // );
  
  const handlerAddToCart = () => {
    dispatch(addGoodsToCartAC({ title: el.title, value: 1,  good:el._id}));
  };

  const handlerDeleteFromCart = () => {
    dispatch(delGoodsFromCartAC(el.title));
  };

  const handlerMinus = () => {
    if (cart.length === 1 && +goodsNumberInput.current.value === 1) {
      localStorage.cart = JSON.stringify([])
    }
    if (+goodsNumberInput.current.value === 1) {
      dispatch(delGoodsFromCartAC(el.title));
    } else {
      dispatch(
        adjustCartAC({
          title: el.title,
          value: +goodsNumberInput.current.value - 1,
        })
      );
    }
  };
  const handlerPlus = () => {
    dispatch(
      adjustCartAC({
        title: el.title,
        value: +goodsNumberInput.current.value + 1,
      })
    );
  };
  const handlerChange = () => {
    goodsNumberInput.current.value = goodsNumberInput.current.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    if (+goodsNumberInput.current.value === 0) {
      dispatch(delGoodsFromCartAC(el.title));
    } else {
      dispatch(
        adjustCartAC({ title: el.title, value: goodsNumberInput.current.value, good:el._id})
      );
    }
  };

  return (
    <div className="goodsbox">
      {(cart.length && location.pathname === "/cart" && el) || location.pathname === "/goods" || location.pathname === `/admin/application/edit/${id}` ?  <><div>
        <h5>{el.title}</h5>
        <span>Цена: ₽{el.price || itemInCart.price}</span>
      </div>
      <div style={{overflow:"hidden", position:"relative", alignItems:"center", justifyContent:"center"}} className="goodsboximage">{el.image.length ? <img alt='' style={{position: "absolute",  width: "265px"}} src={el.image}></img>: <img alt='' style={{position: "absolute",  width: "265px", height:"120px"}} src="/images/1.png"></img>}</div>
      <div>
        <div className="inline">
          {itemInCart ? (
            <>
              <input
                onChange={handlerChange}
                type="text"
                value={itemInCart.value}
                ref={goodsNumberInput}
              />
              <button
                onClick={handlerMinus}
                className="button primary plusminus middlebutton"
              >
                -
              </button>
              <button
                onClick={handlerPlus}
                className="button primary plusminus"
              >
                +
              </button>
            </>
          ) : (
            <button onClick={handlerAddToCart} className="adddeletebutton">
              Добавить в корзину
            </button>
          )}
        </div>
        {location.pathname === "/cart" && (
          <div>
            <button onClick={handlerDeleteFromCart} className="adddeletebutton">
              Удалить из корзины
            </button>
          </div>
        )}
      </div> </> :<></>}
      
    </div>
  );
}
