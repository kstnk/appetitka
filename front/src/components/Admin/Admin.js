import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  
  
  return (
    <>
    <strong>
    Система обработки и регистрации заказов.
    <br />
    ООО "Аппетиткино", торговая марка "Солёнушка".
  </strong>
    <div>
     <div><Link to='/admin/goodsList' >Список товаров</Link></div>
      <Link to='/admin/applicationList' >Список заявок</Link>
    </div>
    </>
  );
}

export default Admin;
