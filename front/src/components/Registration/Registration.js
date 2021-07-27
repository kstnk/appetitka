import React from 'react';

function Registration() {
  const handlerSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const itn = event.target.itn.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const login = event.target.login.value;

    const preResult = await fetch("/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, itn, password, phone, email, login }),
    });
    const result = await preResult.json()
    
    if(result.message) {
     console.log(result.message)
    }
    else {
     document.location.href = '/profile'
    }


  };

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Название организации:</label>
          <input required type="text" name="title" />
        </div>
        <div>
          <label>ИНН:</label>
          <input required type="text" name="itn" />
        </div>
        <div className="mb-3">
          <label>Номер телефона:</label>
          <input required type="text" name="phone" />
        </div>
        <div>
          <label>Email:</label>
          <input required type="email" name="email" />
        </div>
        <div>
          <label>Логин:</label>
          <input required type="text" name="login" placeholder="Будет использоваться для входа на сайт"/>
        </div>
        <div>
          <label>Пароль:</label>
          <input required type="password" name="password" />
        </div>
        <div style={{marginTop: "1em"}}>
          <input type="submit" value="Зарегистрировать" />
        </div>
      </form>
    </div>
  );
}

export default Registration;
