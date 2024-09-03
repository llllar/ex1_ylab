import React, { useEffect, useState } from "react"
const Auth = ({ setUser }) => {
  const users = [
    { username: "user1@mail.ru", password: "1234" },
    { username: "user2@mail.ru", password: "1234" },
    { username: "user3@mail.ru", password: "1234" },
  ]

  const [errorMsg, setErrorMsg] = useState(" ")

  const logIn = async (event) => {
    event.preventDefault()

    var { email, password } = document.forms[0]

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }
    mockFetch("api/account/login", requestOptions)
      .then((response) => {
        console.log("Response:", response)
        setUser({ isAuthenticated: true })
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  const mockFetch = (url, options) => {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(options.body)
      if (data.email && data.password) {
        const user = users.find(
          (user) => user.username === data.email && user.password === data.password
        )
        if (user) {
          resolve({ status: 200, message: "Вход выполнен" })
        } else {
          reject({ status: 400, message: "Неправильно введена почта или пароль" })
        }
      } else {
        reject({ status: 400, message: "Заполните все поля" })
      }
    })
  }

  return (
    <div className="Window">
      <form onSubmit={logIn} className="AuthForm">
        <center className="Head">ВХОД</center>

        <div className="Field">
          <label>ЭЛЕКТРОННАЯ ПОЧТА</label>
          <input type="text" name="email" className="InputField" />
        </div>
        <br />
        <div className="Field">
          <label>ПАРОЛЬ</label>
          <input type="password" name="password" className="InputField" />
        </div>
        <label
          style={{
            fontSize: "12px",
            color: "#c73d28",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "15px",
            height: "12px",
          }}
        >
          {errorMsg}
        </label>
        <input type="submit" className="SendButton" value="Войти" />
      </form>
    </div>
  )
}

export default Auth
