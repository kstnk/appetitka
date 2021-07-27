import React from "react";
import Navbar from "../../Navbar/Navbar";

function SideBar() {
  return (
    <div id="sidebar">
      <div className="inner sidemenu">
        <div className='logoandmenu'>
          <a href="/"><img src="/images/logo_sol1.png" alt="" /></a>
          <h4>Торговая марка «Солёнушка»</h4>
          <div className="subtitle">Система формирования заказов</div>
        {/* <section id="search" className="alt">
          <form method="post" action="#">
            <input type="text" name="query" id="query" placeholder="Search" />
          </form>
        </section> */}

        <Navbar />
        </div>

        {/* <header class="major">
          <h3>Информация для связи</h3>
        </header> */}
        <div>
        <section className="sidecontacts logoandmenu">
          <ul className="contact">
            <li className="icon solid fa-envelope">
              <a href="mailto:info@solenushka.ru">info@solenushka.ru</a>
            </li>
            <li className="icon solid fa-phone">
              <a href="tel:+74012640707">+7 (4012) 640-707</ a>
              <br />
              <a href="tel:+74012640202">+7 (4012) 640-202</ a>
            </li>
            <li className="icon solid fa-home">
              238651, Калининградская область, Полесский район, <br />
              поселок Придорожное, <br />
              переулок Калининградский, дом 3.
            </li>
          </ul>
        </section>
        </div>

        {/* <footer id="footer">
          <p className="copyright">
            © 2021 Аппетитка и Группа Товарищей.
            <br />
            Design: <a href="https://html5up.net">HTML5 UP</a>.
          </p>
        </footer> */}
      </div>
      <a href="#sidebar" className="toggle">
        Toggle
      </a>
    </div>
  );
}

export default SideBar;
