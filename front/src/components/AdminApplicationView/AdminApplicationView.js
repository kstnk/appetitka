import React from "react";


export default function CartGood({ el }) {
  return (
    <div>
      <div className="fieldpair">
        <div>{el.title}</div>
        <div>
          Цена: ₽{el.good.price}<br />Количество: {el.value} шт.
        </div>
      </div>
    </div>
  );
}
