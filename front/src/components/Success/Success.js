import React from 'react'
import { Link } from 'react-router-dom';

export default function Success() {
  console.log('123');
  return (
    <div style={{borderRadius: '40px', border: 'solid 5px #f56a6a', marginTop: '100px', backgroundColor: '#f5f6f7', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2>Ваша заявка оформлена!</h2>
      <h3>Cпасибо что выбрали нас!</h3>
      <Link className='button primary adddeletebutton' to='/profile'>Профиль</Link>
    </div>
  )
}

