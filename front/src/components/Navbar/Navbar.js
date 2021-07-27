import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserAC, initAgentApplicationsAC } from "../../utils/redux/actionCreators";

export default function Navbar() {
  const admin = document.cookie.includes('admin');
  const agent = document.cookie.includes('user');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const preResult = await fetch('/agent/getUserInfo', {
        credentials: 'include',
      });
      const result = await preResult.json();
      dispatch(getCurrentUserAC(result));
      if(!admin) {
        const responce = await fetch(`/agent/profile/${result}`);
        const resultApp = await responce.json();
        if(!responce.message){
          dispatch(initAgentApplicationsAC(resultApp))
        }
        
      }
   
    })();
  },[admin, dispatch]);


  const handlerLogout = (event) => {
    event.preventDefault()
    localStorage.cart = JSON.stringify([])
    fetch('/logout');
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "admin=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.location.href = "/";
  };

  return (
    <nav id="menu">
      <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        {agent || admin ? null : (
          <>
            <li>
              <Link to="/login">Вход в систему</Link>
            </li>
            <li>
              <Link to="/registration">Регистрация</Link>
            </li>
          </>
        )}
        {agent && !admin ? (
          <>
            <li>
              <Link to="/profile">Профиль</Link>
            </li>
            <li>
              <Link to="/goods">Каталог товаров</Link>
            </li>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
            <li>
              <Link to="#" onClick={handlerLogout}>
                Выход из системы
              </Link>
            </li>
          </>
        ) : null}

        {/* <li><Link to="/about">About</Link></li> */}
        {admin ? (
          <>
            <li>
              <Link to="/admin/goodsList">Редактирование товаров</Link>
            </li>

            <li>
              <Link to="/admin/applicationList">Управление заявками</Link>
            </li>

            <li>
              <Link to="#" onClick={handlerLogout} >
                Выход из системы
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
