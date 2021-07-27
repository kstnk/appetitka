import React from "react";

function Home() {
  const admin = document.cookie.includes("admin");
  return (
    <>
     {admin ? <strong>
        Система обработки и регистрации заказов.
        <br />
        ООО "Аппетиткино", торговая марка "Солёнушка".
      </strong> :
      <> <strong>
        Система обработки и регистрации заказов.
        <br />
        ООО "Аппетиткино", торговая марка "Солёнушка".
      </strong>
      <p>Пожалуйста, войдите или зарегистрируйтесь!</p></>} 
    </>
  );
}

export default Home;
