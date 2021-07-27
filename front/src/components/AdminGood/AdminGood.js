import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteGoodsAC,
  editGoodsListAC,
} from "../../utils/redux/actionCreators";

export default function AdminGood({ el }) {
  const [status, setStatus] = useState("display");
  const goodNameField = useRef();
  const goodPriceField = useRef();
  const goodStockField = useRef();
  const dispatch = useDispatch();

 

  const editHandler = async () => {
    const response = await fetch("/admin/goodslist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: el._id,
        title: goodNameField.current.value,
        price: goodPriceField.current.value,
        stock: goodStockField.current.value,
      }),
    });
    const editedGood = await response.json();
    dispatch(editGoodsListAC(editedGood));
    setStatus("display");
  };

  const deleteHandler = async () => {
    const response = await fetch("/admin/goodslist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: el._id,
      }),
    });
    const deletedGood = await response.json();
    dispatch(deleteGoodsAC(deletedGood));
    setStatus("display");
  };

  return (
    <div className="admingoodsbox">
      <div>
        <div className="fieldpair">
          <div>Название:</div>
          <div>
            {["display", "delete"].includes(status) && el.title}
            {status === "edit" && (
              <input type="text" ref={goodNameField} defaultValue={el.title} />
            )}
          </div>
        </div>
        <div className="fieldpair">
          <div>Цена:</div>
          <div>
            {["display", "delete"].includes(status) && `₽${el.price}`}
            {status === "edit" && (
              <input type="text" ref={goodPriceField} defaultValue={el.price} />
            )}
          </div>
        </div>
        <div className="fieldpair">
          <div>Склад:</div>
          <div>
            {["display", "delete"].includes(status) && el.stock}
            {status === "edit" && (
              <input type="text" ref={goodStockField} defaultValue={el.stock} />
            )}
          </div>
        </div>
      </div>
      <div>
        {status === "display" && (
          <>
            <button onClick={() => setStatus("edit")} className="button">
              Редактировать товар
            </button>

            <button onClick={() => setStatus("delete")} className="button">
              Удалить товар
            </button>
          </>
        )}
        {status === "edit" && (
          <>
            <button onClick={editHandler} className="button">
              Подтвердить
            </button>
            <button onClick={() => setStatus("display")} className="button">
              Отменить
            </button>
          </>
        )}
        {status === "delete" && (
          <>
            Вы уверены, что хотите<br /> удалить данный товар из базы?
            <button onClick={deleteHandler} className="button">
              Удалить
            </button>
            <button onClick={() => setStatus("display")} className="button">
              Отмена
            </button>
          </>
        )}
      </div>
    </div>
  );
}
