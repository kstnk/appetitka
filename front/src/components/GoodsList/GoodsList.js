import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { additionalGoodsToAppAC, clearCartAC, initCartFromStorageAC, initGoodsAC } from "../../utils/redux/actionCreators";
import Good from "../Good/Good";

export default function GoodsList() {
const rightPanelDiv = useRef();

  const goodsState = useSelector((state) => state.goodsReducer.goods);
  const applications = useSelector((state) => state.adminReducer.applications)
  const dispatch = useDispatch();
  // Логика для Админа 
  const additionalGoods = useSelector((state)=> state.agentReducer.cart)
  const {id} = useParams();
  let goodsToShow
  let needApp
  const admin = document.cookie.includes('admin');
  if(admin){
    // console.log(id)
    needApp = applications.find(element => element.regnumber == +id)
    let goodsInApp = needApp.goods
    goodsInApp = goodsInApp.map(el => el.title)
    goodsToShow = goodsState.filter(element => goodsInApp.indexOf(element.title) === -1)
  }

  const handlerEditApplication = ()=>{
    dispatch(additionalGoodsToAppAC({goods:additionalGoods, regnumber:id}))
    dispatch(clearCartAC({goods:additionalGoods, regnumber:id}))
  }

  // Логика для Агента 
  
  
  const goodsSearchField = useRef();
  let cart = useSelector((state) => state.agentReducer.cart);
  const [goodsListToDisplay, setGoodsListToDisplay] = useState();

  const handleSeachGoods = () => {
    setGoodsListToDisplay(
      goodsState.filter((good) =>
        good.title
          .toLowerCase()
          .includes(goodsSearchField.current.value.toLowerCase())
      )
    );
  };
  useEffect(() => {
    if (!id){
      if(!cart.length && !localStorage.cart){
        localStorage.setItem("cart", JSON.stringify(cart))
      } else if(!cart.length && JSON.parse(localStorage.cart).length){
        dispatch(initCartFromStorageAC(JSON.parse(localStorage.cart)))
      }else{
        localStorage.cart = JSON.stringify(cart)
      }
   
    }
    }
    , [cart,dispatch, id])

  useEffect(() => {
    fetch("/agent/goods")
      .then((res) => res.json())
      .then((data) => dispatch(initGoodsAC(data)));
  }, [dispatch]);

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
    <>
      {!admin ?
        <>
          <div className="searchfield">
            <input
              type="search"
              autocomplete="off"
              ref={goodsSearchField}
              id="query"
              placeholder="поиск товара по названию..."
              onChange={handleSeachGoods}
            />
          </div>
          <div className="goodslist">
            {goodsListToDisplay
              ? goodsListToDisplay.map((el) => <Good key={el.title} el={el} />)
              : goodsState.map((el) => <Good key={el.title} el={el} />)}
          </div>
        </>
        :
        <>
          <div className="inline">
            <div className="goodslist">
              {goodsToShow
                ? goodsToShow.map((el) => <Good key={el.title} el={el} />)
                : goodsState.map((el) => <Good key={el.title} el={el} />)}
            </div>

            <div className="confirmblock" ref={rightPanelDiv}>
              <div className={divMargin > 0 && "fixed"} style={{ top: "1em" }}>
              <div>После добавления товаров подтвердите изменения в заявке:</div>
              <Link 
                to={`/admin/application/edit/${id}`}
                onClick={handlerEditApplication}
                className="button primary"
              >
                Дополнить заявку
              </Link>
              </div>
            </div>

          </div>
        </>
      }
    </>

  );
}
