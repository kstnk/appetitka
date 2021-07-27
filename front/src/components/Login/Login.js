import React from "react";

function Login() {
  const handlerSubmit = async (event) => {
    event.preventDefault();

    const login = event.target.login.value;
    const password = event.target.password.value;

    const preResult = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ login, password }),
    });
    const result = await preResult.json();
    if (result.admin) {
      document.cookie='admin=admin'
      document.location.href = "/";
    } else if (result.message) {
      console.log(result.message)
    } else {
      document.location.href='/profile'
    }
  };

  const digitsFilter = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
  };

  return (
    <div className="inputform">
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            name="login"
            className="expandedinput"
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" name="password" className="expandedinput" />
        </div>
        <div>
          <input type="submit" value="Войти" />
        </div>
      </form>
    </div>
  );
}

export default Login;
