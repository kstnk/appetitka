import React from 'react';
import { useSelector } from 'react-redux';

function CartStatus() {
  const cartContent = useSelector(state => state.agentReducer.cart);
  return (
    <div className="icons">
      {cartContent.length ? "Наименований в корзине: " + cartContent.length + "шт.": "Ваша корзина пуста"}
    </div>
  );
}

export default CartStatus;
