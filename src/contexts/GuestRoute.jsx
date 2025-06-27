// components/GuestRoute.jsx
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null

  if (isLoggedIn) {
    return <>
    <h1>anda sudah login</h1>
    
    </>// atau return <></>
  }

  return children
}

export default GuestRoute
