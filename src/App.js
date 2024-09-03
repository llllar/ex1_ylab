import React, { useEffect, useState } from "react"
import "./App.css"
import Auth from "./components/Auth"

const App = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
  })

  const logOff = (event) => {
    event.preventDefault()

    const requestOptions = {
      method: "POST",
    }
    mockFetch("api/account/logoff", requestOptions)
      .then((response) => {
        console.log("Response:", response)
        setUser({ isAuthenticated: false })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const mockFetch = (url, options) => {
    return new Promise((resolve) => {
      resolve({ status: 200, message: "Выход" })
    })
  }

  return (
    <>
      {!user.isAuthenticated ? (
        <Auth setUser={setUser} />
      ) : (
        <form onSubmit={logOff} className="Exit">
          <center style={{ fontSize: "30px" }}>ВЫ ВОШЛИ!</center>
          <input type="submit" className="SendButton" style={{ width: "300px" }} value="ВЫЙТИ" />
        </form>
      )}
    </>
  )
}

export default App
