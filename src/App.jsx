import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterForm from './loginSignup/RegisterForm'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './loginSignup/LoginForm'
import { ToastContainer } from 'react-toastify';
import AddVehiclesAdmin from './adminPages/AddVehiclesAdmin'
import ListVehiclesUser from './userPages/ListVehiclesUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AddVehiclesAdmin />} />
         <Route path="/user/dashboard" element={<ListVehiclesUser />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
