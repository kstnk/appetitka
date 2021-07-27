import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  changeQuantityGoodAC,
  deleteFromApplicationAC,
} from "../../utils/redux/actionCreators";

export default function GoodsEditByAdmin({ el }) {
  const goodValue = useRef();
  const { id } = useParams();
  let itemInCart = useSelector((state) =>
    state.adminReducer.applications
      .find((application) => application.regnumber == +id)
      .goods.find((good) => good.title === el.title)
  );
  const dispatch = useDispatch();
  const handlerDeleteFromApplication = () => {
    console.log("something");
    dispatch(deleteFromApplicationAC({ regnumber: id, goodTitle: el.title }));
  };
  const handlerIncreaseGoods = () => {
    itemInCart.value = itemInCart.value + 1;
    dispatch(
      changeQuantityGoodAC({
        value: itemInCart.value,
        regnumber: id,
        goodTitle: el.title,
      })
    );
    console.log(itemInCart.value);
  };
  const handlerDecreaseGoods = () => {
    if (+itemInCart.value !== 1) {
      itemInCart.value = itemInCart.value - 1;
      dispatch(
        changeQuantityGoodAC({
          value: itemInCart.value,
          regnumber: id,
          goodTitle: el.title,
        })
      );
    } else {
      console.log(itemInCart.value);
      dispatch(deleteFromApplicationAC({ regnumber: id, goodTitle: el.title }));
    }
  };
  const handlerChangeValue = () => {
    goodValue.current.value = goodValue.current.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    console.log(goodValue.current.value);
    if (+goodValue.current.value === 0) {
      dispatch(deleteFromApplicationAC({ regnumber: id, goodTitle: el.title }));
    } else {
      dispatch(
        dispatch(
          changeQuantityGoodAC({
            value: +goodValue.current.value,
            regnumber: id,
            goodTitle: el.title,
          })
        )
      );
    }
  };



  return (
    <>
      {itemInCart ? (
        <div className="fieldpair">
          <div>{el.title}</div>
          <div className="inline admineditgood">
            <input
              ref={goodValue}
              onChange={handlerChangeValue}
              type="text"
              value={itemInCart.value}
            />
            <button
              onClick={handlerDecreaseGoods}
              className="button primary plusminus middlebutton"
            >
              -
            </button>
            <button
              onClick={handlerIncreaseGoods}
              className="button primary plusminus"
            >
              +
            </button>
            <button
              onClick={handlerDeleteFromApplication}
              className="adddeletebutton"
            >
              Удалить из заявки
            </button>{" "}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
