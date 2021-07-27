import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Good from "../Good/Good";
import { clearCartAC, initCartFromStorageAC, initGoodsAC } from "../../utils/redux/actionCreators";
import { Link } from "react-router-dom";


export default function CartGoodsList() {
  const dispatch = useDispatch();
  const rightPanelDiv = useRef();
  const commentValue = useRef();

  let user = useSelector((state) => state.agentReducer.currentUser);
  let cart = useSelector((state) => state.agentReducer.cart);
  let goods = useSelector((state) => state.goodsReducer.goods);

  function totalCost() {
    let result = 0;
    cart.forEach((el) => {
      let price = 0;
      for (let i = 0; i < goods.length; i++) {
        if (goods[i].title === el.title) {
          price = +goods[i].price;
        }
      }
      result += price * el.value;
    });
    return result;
  }
  useEffect(() => {
    if(!cart.length && !localStorage.cart){
      localStorage.setItem("cart", JSON.stringify(cart))
    } else if(!cart.length && JSON.parse(localStorage.cart).length){
      dispatch(initCartFromStorageAC(JSON.parse(localStorage.cart)))
    }else{
      localStorage.cart = JSON.stringify(cart)
    }
    
  }, [cart,dispatch])
  useEffect(() => {
    fetch("/agent/goods")
    .then((res) => res.json())
    .then((data) => dispatch(initGoodsAC(data)));
    if(JSON.parse(localStorage.cart).length)
      dispatch(initCartFromStorageAC(JSON.parse(localStorage.cart)))
  }, [dispatch])
  function makeApplication() {
    localStorage.cart = JSON.stringify([])
   
    fetch(`/agent/cart/${user}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goods: cart, comment:commentValue.current.value }),
    })
      .then((res) => res.json())
      // .then((data) => alert(data.message));
    dispatch(clearCartAC(""));
  }

  const clearCart = () => {
    localStorage.cart = JSON.stringify([])
    dispatch(clearCartAC(""));
  };

  const [divMargin, setDivMargin] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setDivMargin(
        e.target.documentElement.scrollTop - rightPanelDiv?.current?.offsetTop
      );
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [setDivMargin]);

  return (
    <div className="inline">
      <div className="goodslist">
        {cart.length ? <>{console.log("something", cart)}{cart.map((el) => (
          <Good
            key={el.title}
            el={goods.find((good) => good.title === el.title)}
          />
        ))} </>: <></>}
        
      </div>
      {cart.length ? (
        <div className="confirmblock" ref={rightPanelDiv}>
          <div className={divMargin > 0 && "fixed"} style={{ top: "1em" }}>
            <h4>Ориентировочная стоимость заказа:</h4>
            <div className="sum">₽ {totalCost()}</div>
            <textarea ref = {commentValue} placeholder="Комментарий к заказу..."></textarea>
            <Link to='/success' onClick={makeApplication} className="button primary">
              Сформировать заявку
            </Link>
            <button onClick={clearCart} className="button primary active">
              Очистить корзину
            </button>
          </div>
        </div>
      ) : (<div>Ваша корзина пуста!</div>)}
    </div>
  );
}
