import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";
import {
  initAgentsAC,
  initApplicationsAC,
  requestGoodsAC,
} from "../../../utils/redux/actionCreators";
import CartStatus from "../CartStatus/CartStatus";

function Header() {
  const location = useLocation();
  const adminCookie = document.cookie.includes("admin");
  const dispatch = useDispatch();
  useEffect(() => {

    if(adminCookie){

      console.log("something");
      fetch('/admin/applications')
      .then(response => response.json())
      .then(applications => dispatch(initApplicationsAC(applications.applications)))
      fetch('/admin/agents')
        .then(response => response.json())
        .then(agents => dispatch(initAgentsAC(agents.agents)))
        fetch('/admin/goodslist')
        .then(response => response.json())
        .then(goods => dispatch(requestGoodsAC(goods.goods)))

    }
  }, [dispatch, adminCookie]);
  return (
    <header id="header">
      <strong>
        {location.pathname === "/profile" && "Профиль"}
        {location.pathname === "/goods" && "Каталог товаров"}
        {location.pathname === "/cart" && "Корзина"}
        {location.pathname === "/about" && "О компании"}

        {location.pathname === "/admin/goodsList" && "Редактирование товаров"}
        {location.pathname === "/admin/applicationList" && "Управление заявками"}
      </strong>

      {location.pathname !== "/cart" && !document.cookie.includes("admin") && (
        <CartStatus />
      )}
    </header>
  );
}

export default Header;
